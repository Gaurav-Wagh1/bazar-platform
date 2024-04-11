const { Op } = require('sequelize');
const { Product, ProductSKU, Subcategory, Sequelize, sequelize } = require("../models/index");
const { AppError } = require('../utils/error-classes');
const { StatusCodes } = require('http-status-codes');

class ProductRepository {
    async findOrCreate(filter, data) {
        try {
            const [response, created] = await Product.findOrCreate({
                where: filter,
                defaults: {
                    name: data.name,
                    description: data.description,
                    highlights: data.highlights
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
                attributes: {
                    exclude: ["createdAt", "updatedAt", "SubcategoryId", "SupplierId"]
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

    async getAllProducts(filter, priceFilter) {
        try {
            const products = await Product.findAll({
                where: filter,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "SubcategoryId", "SupplierId", "description", "highlights"]
                },
                include: {
                    model: ProductSKU,
                    where: priceFilter,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "ProductId", "quantity", "highlights"]
                    }
                }
            });
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findProductBySubCategory(filterForSubcategory, filterForName, priceFilter) {
        try {
            const response = await Subcategory.findAll({
                where: filterForSubcategory,
                include: {
                    model: Product,
                    where: filterForName,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "description", "highlights", "createdAt", "updatedAt", "SubcategoryId", "SupplierId"],
                    },
                    include: {
                        model: ProductSKU,
                        where: priceFilter,
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "ProductId", "quantity", "highlights"]
                        }
                    }
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "description", "CategoryId"]
                }
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findBrandNamesForFilter(subCategoryId) {
        try {
            const distinctBrands = await sequelize.query(
                `SELECT DISTINCT SUBSTRING_INDEX(name, " ", 1) AS brand FROM ${`Products`} AS ${`Product`} where SubcategoryId = ${subCategoryId}`,
                { type: Sequelize.QueryTypes.SELECT }
              );
            return distinctBrands.map(item => item.brand);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProductRepository;