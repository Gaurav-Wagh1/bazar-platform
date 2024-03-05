const { Op } = require('sequelize');
const { Product } = require("../models/index")

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
}

module.exports = ProductRepository;