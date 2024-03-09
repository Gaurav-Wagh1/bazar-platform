const { StatusCodes } = require("http-status-codes");
const { BookingRepository, CartRepository } = require("../repositories/index");
const { AppError } = require("../utils/error-classes");
const { sendEmail } = require("../utils/send-mail");
const { EMAIL_ID } = require("../config/server-config");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
        this.cartRepository = new CartRepository();
    }
    async createBooking(data) {
        try {
            const cart = await this.cartRepository.getCart({ id: data.cartId });
            if (!cart.total || !cart.CartItems) {
                throw new AppError("Empty Cart", StatusCodes.BAD_GATEWAY, "Cart is empty!");
            }
            const cartItems = cart.CartItems;       //quantity, ProductSKUId

            for (const cartItem of cartItems) {
                const productSKU = await cartItem.getProductSKU();
                if (productSKU.quantity <= 0) {
                    throw new AppError("Not available", StatusCodes.BAD_GATEWAY, "This product is not available in the stock!");
                }

                if (cartItem.quantity > productSKU.quantity) {
                    throw new AppError("Insufficient Stock", StatusCodes.OK, `Only ${productSKU.quantity} units are available!`);
                }
            };

            // Logic for delivery time;
            // here 2days after booking is a assumed;
            const date = new Date();
            const deliveryDate = new Date(date.setDate(date.getDate() + 2));

            //  creating order details;
            const orderDetail = await this.bookingRepository.createOrderDetail(
                {
                    total: cart.total,
                    UserId: cart.UserId,
                    deliveryTime: deliveryDate
                }
            );

            //  creating order items;
            cartItems.forEach(async (cartItems) => {
                await orderDetail.createOrderItem(
                    {
                        quantity: cartItems.quantity,
                        ProductSKUId: cartItems.ProductSKUId
                    }
                );
            });

            // // Integration of Payment Gateway will be here;
            const paymentGatewayResponse = {
                amount: orderDetail.total,
                provider: "",
                status: "success",
                paymentInfo: ""
            };

            cartItems.forEach(async (cartItem) => {
                const productSKU = await cartItem.getProductSKU();
                productSKU.quantity -= cartItem.quantity;
                productSKU.save();
            });

            await orderDetail.createPaymentDetail(paymentGatewayResponse);

            orderDetail.status = "Booked";
            await orderDetail.save();

            const user = await cart.getUser();
            const mailData = {
                from: EMAIL_ID,
                to: user.email,
                subject: "Purchase Successful",
                text: `Hello ${user.fullName}, you have successfully booked the product/products form Bazar, it will be delivered at ${deliveryDate.toLocaleString()}`
            }
            sendEmail(mailData)
            return { orderDetail, orderItems: await orderDetail.getOrderItems() };
        } catch (error) {
            console.log("hello")
            // console.log(error);
            throw error;
        }
    }
}

module.exports = BookingService;