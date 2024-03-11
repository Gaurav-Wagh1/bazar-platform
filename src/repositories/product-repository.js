const { Op } = require('sequelize');
const { Product, ProductSKU } = require("../models/index");
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
            const products = await Product.findOne({
                where: {
                    id: productId
                },
                attributes:{
                    exclude:["createdAt", "updatedAt", "SubcategoryId", "SupplierId"]
                },
                include: {
                    model: ProductSKU,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "ProductId", "quantity"]
                    }
                }
            });
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProducts(filter) {
        try {
            const products = await Product.findAll({
                where:filter,
                attributes:{
                    exclude:["createdAt", "updatedAt", "SubcategoryId", "SupplierId"]
                },
                include: {
                    model: ProductSKU,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "ProductId", "quantity"]
                    }
                }
            });
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProductRepository;