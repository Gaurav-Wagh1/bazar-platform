const { Op } = require('sequelize');
const SubcategoryService = require('../services/sub-category-service');
const { ProductRepository } = require('../repositories/index');
const uploadImageOnCloudinary = require('../utils/cloudinary-upload');
const { AppError } = require('../utils/error-classes');
const { StatusCodes } = require('http-status-codes');

class ProductService {
    constructor() {
        this.subCategoryService = new SubcategoryService();
        this.productRepository = new ProductRepository();
    }

    async createProduct(data, imageData) {   // name, description, category, subCategory, variety, price, quantity;
        try {
            // image upload;
            let imageURL = "";
            if (imageData) {
                const localImagePath = imageData["image"][0].path;
                imageURL = await this.#handleImageUpload(localImagePath);
            }

            const filterForProduct = { name: data.name, SupplierId: 1 };
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
                price: data.price,
                image: imageURL
            }
            await product.createProductSKU(dataForSKU);
            return await this.getProduct(product.id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProduct(productId) {
        try {
            const product = await this.productRepository.getProduct(productId);
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProducts(data) {
        try {
            const products = await this.productRepository.getAllProducts();
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async #handleImageUpload(localImagePath) {
        try {
            const imageURL = await uploadImageOnCloudinary(localImagePath);
            return imageURL;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;