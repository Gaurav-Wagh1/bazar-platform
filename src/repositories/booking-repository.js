const { PaymentDetail, OrderDetail, OrderItem, ProductSKU, Product } = require("../models/index");

class BookingRepository {
    async createPaymentDetail(data) {
        try {
            const response = await PaymentDetail.create(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getPaymentDetail(paymentId) {
        try {
            const response = await PaymentDetail.findByPk(paymentId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createOrderDetail(data) {
        try {
            const response = await OrderDetail.create(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getOrderDetail(orderId) {
        try {
            const response = await OrderDetail.findByPk(orderId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createOrderItem(data) {
        try {
            const response = await OrderItem.create(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getOrderItem(orderId) {
        try {
            const response = await OrderItem.findByPk(orderId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllOrders(user) {
        try {
            const orderDetails = await user.getOrderDetails({
                include:[
                    {
                        model: OrderItem,
                        attributes: {
                            exclude: ["ProductSKUId", "OrderDetailId", "createdAt", "updatedAt"]
                        },
                        include: {
                            model: ProductSKU,
                            attributes: {
                                exclude: ["ProductId", "quantity", "createdAt", "updatedAt"]
                            },
                            include: {
                                model: Product,
                                attributes: {
                                    exclude: ["description", "SubcategoryId", "createdAt", "updatedAt", "SupplierId"]
                                }
                            }
                        },
                    },
                    {
                        model:PaymentDetail,
                        attributes:{
                            exclude:["id", "provider", "OrderDetailId"]
                        }
                    }
                ],
                attributes: {
                    exclude: ["UserId"]
                }
            });
            return orderDetails;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = BookingRepository;