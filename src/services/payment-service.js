const makePayment = async (orderDetail) => {
    const paymentGatewayResponse = {
        amount: orderDetail.total,
        provider: "Bazar",
        status: "success",
        paymentInfo: "",
        transactionId: Date.now()
    };

    const paymentDetails = await orderDetail.createPaymentDetail(paymentGatewayResponse);
    return paymentDetails;
}

module.exports = {
    makePayment
}