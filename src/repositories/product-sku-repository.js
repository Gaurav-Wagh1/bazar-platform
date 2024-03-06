const { ProductSKU } = require("../models/index")

class ProductSKURepository {
    async getProductSKU(productSKUId) {
        try {
            const productSku = await ProductSKU.findByPk(productSKUId);
            return productSku;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

module.exports = ProductSKURepository;