const { Category, Subcategory, Product, ProductSKU } = require("../models/index");

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

    async getAllProductsByCategory(categoryName, priceFilter, filterForSubcategory) {
        try {
            const products = await Category.findOne({
                where: {
                    name: categoryName
                },
                attributes: {
                    exclude: ["description", "createdAt", "updatedAt"]
                },
                include: {
                    model: Subcategory,
                    where: filterForSubcategory,
                    attributes: {
                        exclude: ["description", "createdAt", "updatedAt", "CategoryId"]
                    },
                    include: {
                        model: Product,
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
                    }
                }
            });
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getSubCategoriesForFilter(categoryName) {
        try {
            const response = await Category.findOne({
                where: {
                    name: categoryName
                },
                include: {
                    model: Subcategory
                }
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = CategoryRepository;