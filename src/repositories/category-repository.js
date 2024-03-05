const { Category } = require("../models/index");

class CategoryRepository {
    async findOrCreate(filter) {
        try {
            const [response, created] = await Category.findOrCreate({
                where: filter,
                defaults: {
                    name: filter.name
                }
            });
            return { response, created };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CategoryRepository;