const { Cart, CartItem, ProductSKU, Product } = require("../models/index.js");

class CartRepository {
    async findOrCreate(filter) {
        try {
            const [response, created] = await Cart.findOrCreate({
                where: filter,
                defaults: {
                    total: 0,
                    UserId: filter.UserId
                }
            });
            return { response, created };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getCart(filter) {
        try {
            const response = await Cart.findOne({
                where: filter,
                attributes:{
                    exclude:["createdAt", "updatedAt"]
                },
                // include: {
                //     all:true,
                //     nested:true
                // }
                include:{
                    model:CartItem,
                    attributes:{
                        exclude:["createdAt", "updatedAt", "CartId", "ProductSKUId"]
                    },
                    include:{
                        model:ProductSKU,
                        attributes:{
                            exclude:["id", "createdAt", "updatedAt", "quantity", "ProductId"]
                        },
                        include:{
                            model:Product,
                            attributes:{
                                exclude:["createdAt", "updatedAt", "SubcategoryId", "SupplierId"]
                            }
                        }
                    }
                }
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getCartItem(id) {
        try {
            const response = await CartItem.findOne({
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async removeCartItem(itemId) {
        try {
            await CartItem.destroy({
                where: {
                    id: itemId
                }
            });
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = CartRepository;