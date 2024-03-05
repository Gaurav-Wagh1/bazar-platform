const { CategoryRepository, SubCategoryRepository } = require("../repositories/index");

class SubcategoryService {

    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.subCategoryRepository = new SubCategoryRepository();
    }

    async findOrCreate(data) {    // category, subCategory
        try {
            // search for sub-category, if absent create it;
            const filterForSubCategory = { name: data.subCategory };
            const subCategoryResponse = await this.subCategoryRepository.findOrCreate(filterForSubCategory);
            const subCategory = subCategoryResponse.response;

            // associate with category;
            if (subCategoryResponse.created) {
                // search for category, if absent create that category;
                const filterForCategory = { name: data.category };
                const categoryResponse = await this.categoryRepository.findOrCreate(filterForCategory);
                const category = categoryResponse.response;
                await subCategory.setCategory(category);
            }

            return subCategory;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = SubcategoryService;