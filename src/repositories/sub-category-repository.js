const { Subcategory } = require("../models/index");

class SubCategoryRepository {
    async findOrCreate(filter) {
        try {
            const [response, created] = await Subcategory.findOrCreate({
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

module.exports = SubCategoryRepository;