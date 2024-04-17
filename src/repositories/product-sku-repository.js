const { ProductSKU, Product } = require("../models/index")

class ProductSKURepository {
    async getProductSKU(productSKUId, filterForSearch = undefined) {
        try {
            if (filterForSearch) {
                const productSku = await ProductSKU.findAll({
                    where: filterForSearch,
                    attributes:{
                        exclude:["createdAt", "updatedAt", "quantity", "ProductId", "highlights"]
                    },
                    include: {
                        model: Product,
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "description", "highlights", "SubcategoryId", "SupplierId"]
                        }
                    }
                });
                return productSku;
            }
            else {
                const productSku = await ProductSKU.findByPk(productSKUId);
                return productSku;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

module.exports = ProductSKURepository;