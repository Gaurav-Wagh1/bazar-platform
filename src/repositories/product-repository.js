const { Op } = require('sequelize');
const { Product } = require("../models/index");
const { AppError } = require('../utils/error-classes');
const { StatusCodes } = require('http-status-codes');

class ProductRepository {
    async findOrCreate(filter, data) {
        try {
            const [response, created] = await Product.findOrCreate({
                where: filter,
                defaults: {
                    name: data.name,
                    description: data.description
                }
            });
            return { response, created };
        } catch (error) {
            console.log(error);
        }
    }

    async getProduct(productId) {
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                throw new AppError("No such Product", StatusCodes.BAD_REQUEST, "No such product is available");
            }
            const productSKUs = await product.getProductSKUs();
            return { product, productSKUs };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProducts() {
        try {
            const products = await Product.findAll({});
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProductRepository;