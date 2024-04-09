const { Op } = require("sequelize");

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

    // this method will find all the entries where status is booked and delivery time is elapse;
    // it will mark it as delivered;
    async getBookedOrderDetailsAndUpdateStatus() {
        try {
            const response = await OrderDetail.findAll({
                where: {
                    status: {
                        [Op.like]: "Booked"
                    },
                    deliveryTime: {
                        [Op.lte]: new Date()
                    }
                }
            });
            response.forEach((element) => {
                OrderDetail.update({ status: "Delivered" }, { where: { id: element.id } })
            });
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
                include: [
                    {
                        model: OrderItem,
                        attributes: {
                            exclude: ["ProductSKUId", "OrderDetailId", "createdAt", "updatedAt"]
                        },
                        include: {
                            model: ProductSKU,
                            attributes: {
                                exclude: ["ProductId", "quantity", "createdAt", "updatedAt", "highlights"]
                            },
                            include: {
                                model: Product,
                                attributes: {
                                    exclude: ["SubcategoryId", "createdAt", "updatedAt", "SupplierId", "highlights", "description"]
                                }
                            }
                        },
                    },
                    {
                        model: PaymentDetail,
                        attributes: {
                            exclude: ["id", "provider", "OrderDetailId"]
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

    async returnOrderItems(orderDetail) {
        return await orderDetail.getOrderItems({
            attributes: {
                exclude: ["ProductSKUId", "OrderDetailId", "createdAt", "updatedAt"]
            },
            include: {
                model: ProductSKU,
                attributes: {
                    exclude: ["ProductId", "quantity", "createdAt", "updatedAt", "highlights"]
                },
                include: {
                    model: Product,
                    attributes: {
                        exclude: ["SubcategoryId", "createdAt", "updatedAt", "SupplierId", "highlights", "description"]
                    }
                }
            },
        })
    }
}

module.exports = BookingRepository;