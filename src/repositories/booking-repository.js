const { PaymentDetail, OrderDetail, OrderItem } = require("../models/index");

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
}

module.exports = BookingRepository;