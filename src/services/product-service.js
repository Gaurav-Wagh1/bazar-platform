const { Op } = require('sequelize');
const SubcategoryService = require('../services/sub-category-service');
const { ProductRepository } = require('../repositories/index');

class ProductService {
    constructor() {
        this.subCategoryService = new SubcategoryService();
        this.productRepository = new ProductRepository();
    }

    async createProduct(data) {   // name, description, category, subCategory, supplierId, variety, price, quantity;
        try {
            const filterForProduct = { name: data.name, SupplierId:1 };
            const productResponse = await this.productRepository.findOrCreate(filterForProduct, data);
            const product = productResponse.response;

            if (productResponse.created) {
                const dataForSubcategory = {
                    category: data.category,
                    subCategory: data.subCategory
                }
                const subCategory = await this.subCategoryService.findOrCreate(dataForSubcategory);
                product.setSubcategory(subCategory);
            }

            const dataForSKU = {
                variety: data.variety,
                quantity: data.quantity,
                price: data.price
            }
            await product.createProductSKU(dataForSKU);
            return true;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductService;