const { StatusCodes } = require("http-status-codes");
const { BookingRepository, CartRepository, UserRepository } = require("../repositories/index.js");
const { AppError } = require("../utils/error-classes.js");
const { sendEmail } = require("../utils/send-mail.js");
const { EMAIL_ID } = require("../config/server-config.js");
const { CartItem, Product } = require("../models/index.js");
const { makePayment } = require("./payment-service.js");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
        this.cartRepository = new CartRepository();
        this.userRepository = new UserRepository();
    }
    async createBooking(userData) {
        try {
            const user = await this.userRepository.getUser(userData.id);
            const cart = await user.getCart({
                include: CartItem
            });
            // const cart = await this.cartRepository.getCart({ id: data.cartId });

            const cartItems = cart.CartItems;       //quantity, ProductSKUId
            if (!cart.total || !cartItems) {
                throw new AppError("Empty Cart", StatusCodes.BAD_GATEWAY, "Cart is empty!");
            }

            for (const cartItem of cartItems) {
                const productSKU = await cartItem.getProductSKU({
                    include: Product
                });
                if (productSKU.quantity <= 0) {
                    throw new AppError("Product Not available!", StatusCodes.BAD_GATEWAY, `${productSKU.Product.name} is not available in the stock!`);
                }

                if (cartItem.quantity > productSKU.quantity) {
                    throw new AppError("Insufficient Stock!", StatusCodes.OK, `Only ${productSKU.quantity} units are available of ${productSKU.Product.name}!`);
                }
            };

            // Logic for delivery time;
            // here 2days after booking is a assumed;
            const date = new Date();
            const deliveryDate = new Date(date.setDate(date.getDate() + 2));

            //  creating order details;
            // const orderDetail = await this.bookingRepository.createOrderDetail(
            //     {
            //         total: cart.total,
            //         UserId: cart.UserId,
            //         deliveryTime: deliveryDate
            //     }
            // );

            const orderDetail = await user.createOrderDetail(
                {
                    total: cart.total,
                    deliveryTime: deliveryDate
                }
            );

            //  creating order items;
            cartItems.forEach((cartItems) => {
                orderDetail.createOrderItem(
                    {
                        quantity: cartItems.quantity,
                        ProductSKUId: cartItems.ProductSKUId
                    }
                );
            });

            // // Integration of Payment Gateway will be here;
            const paymentResponse = await makePayment(orderDetail);

            // await orderDetail.createPaymentDetail(paymentGatewayResponse);

            cartItems.forEach(async (cartItem) => {
                const productSKU = await cartItem.getProductSKU();
                productSKU.quantity -= cartItem.quantity;
                productSKU.save();
            });

            orderDetail.status = "Booked";
            orderDetail.transactionId = paymentResponse.transactionId;
            await orderDetail.save();

            // const user = await cart.getUser();
            const mailData = {
                from: EMAIL_ID,
                to: user.email,
                subject: "Purchase Successful",
                text: `Hello ${user.fullName}, you have successfully booked the product/products form Bazar, it will be delivered at ${deliveryDate.toLocaleString()}`
            }
            sendEmail(mailData)
            return { orderDetail, orderItems: await orderDetail.getOrderItems(),paymentResponse };
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
}

module.exports = BookingService;