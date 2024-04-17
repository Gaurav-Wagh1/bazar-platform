const { Op } = require('sequelize');
const SubcategoryService = require('../services/sub-category-service');
const { ProductRepository, SubCategoryRepository, ProductSKURepository } = require('../repositories/index');
const uploadImageOnCloudinary = require('../utils/cloudinary-upload');
const { AppError } = require('../utils/error-classes');
const { StatusCodes } = require('http-status-codes');

class ProductService {
    constructor() {
        this.subCategoryService = new SubcategoryService();
        this.productRepository = new ProductRepository();
        this.subCategoryRepository = new SubCategoryRepository();
        this.productSKURepository = new ProductSKURepository();
    }

    async createProduct(data, imageData) {   // name, description, category, subCategory, variety, price, quantity;
        try {
            // image upload;
            let imageURL = "";
            if (imageData) {
                const localImagePath = imageData.path;
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
                highlights: data.productSKUHighlight,
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

    async getAllProducts(data) {        // subcategory, name, price;
        try {
            // fetching different products for slider and other components;
            if (data.ids) {
                const idsArr = data.ids.split(",").map(Number);
                let filterArray = [];
                idsArr.forEach(id => filterArray.push({ id: id }));
                return await this.productSKURepository.getProductSKU(undefined, { [Op.or]: filterArray });
            }

            let filterArray = [];
            if (data.price) {
                const priceArr = data.price.split(",");
                for (let i = 0; i < priceArr.length; i += 2) {
                    const minimumAmount = +priceArr[i]?.trim();
                    const maximumAmount = +priceArr[i + 1]?.trim();
                    if (!maximumAmount) {
                        filterArray.push({ price: { [Op.gte]: minimumAmount } })
                    }
                    else {
                        filterArray.push({ price: { [Op.between]: [minimumAmount, maximumAmount] } })
                    }
                }
            }

            const priceFilter = {};
            Object.keys(filterArray).length ? Object.assign(priceFilter, { [Op.or]: filterArray }) : Object.assign(priceFilter, {});

            if (data.subcategory) {
                const productName = data.name ? data.name.split(",") : [];      // ["realme", "apple"]

                const filterForName = {};
                const arrForQuery = productName.map((name) => {
                    return { name: { [Op.like]: `%${name}%` } }
                });
                if (arrForQuery.length) {
                    Object.assign(filterForName, { [Op.or]: arrForQuery })
                };

                const filterForSubcategory = { name: data.subcategory };
                const products = await this.productRepository.findProductBySubCategory(filterForSubcategory, filterForName, priceFilter);

                const subCategory = await this.subCategoryRepository.getSubcategoryByName(data.subcategory);
                let brandsArr = await this.productRepository.findBrandNamesForFilter(subCategory.id);
                brandsArr = brandsArr.map(element => element.toLowerCase());
                return { products: products[0]?.Products ? products[0].Products : [], brandsForFilter: brandsArr, activeFilter: productName.filter(name => brandsArr.includes(name)) };
            }
            if (data.name) {
                const nameArr = data.name.trim().split(",");
                const arrayForFilter = [];
                nameArr.forEach(name => {
                    arrayForFilter.push(
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            }
                        }
                    );
                });
                const nameFilter = {};
                Object.keys(arrayForFilter).length ? Object.assign(nameFilter, { [Op.or]: arrayForFilter }) : Object.assign(nameFilter, {});
                const products = await this.productRepository.getAllProducts(nameFilter, priceFilter);
                const brandsArr = [];
                products.forEach(product => {
                    if (!brandsArr.includes(product.name.substring(0, product.name.indexOf(" ")))) {
                        brandsArr.push(product.name.substring(0, product.name.indexOf(" ")));
                    }
                })
                return { products, activeFilter: brandsArr.map(brand => brand.toLowerCase()), brandsForFilter: brandsArr.map(brand => brand.toLowerCase()) };
            }
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