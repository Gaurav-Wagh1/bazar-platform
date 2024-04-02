const { CartRepository } = require("../repositories/index");
const UserService = require("./user-service");
const { ProductSKURepository } = require("../repositories/index");

class CartService {
    constructor() {
        this.userService = new UserService();
        this.productSKURepository = new ProductSKURepository();
        this.cartRepository = new CartRepository();
    }

    async addToCart(userId, data) {  // productSkuId, quantity;
        try {
            await this.userService.getUser(userId);
            const productSKU = await this.productSKURepository.getProductSKU(data.productSkuId);
            const cartResponse = await this.cartRepository.findOrCreate({ UserId: userId });
            const cart = cartResponse.response;
            cart.total = cart.total + (data.quantity * productSKU.price);
            await cart.save();
            const cartItemData = {
                quantity: data.quantity,
                ProductSKUId: data.productSkuId
            }
            await cart.createCartItem(cartItemData);
            return await this.cartRepository.getCart({ id: cart.id });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getCart(userId) {
        try {
            const cart = await this.cartRepository.getCart({ UserId: userId });
            return cart;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteCartItem(cartItemId) {
        try {
            const cartItem = await this.cartRepository.getCartItem(cartItemId);
            const productSku = await cartItem.getProductSKU();
            const cart = await cartItem.getCart();
            cart.total = cart.total - (cartItem.quantity * productSku.price);
            await cart.save();
            await this.cartRepository.removeCartItem(cartItemId);
            return await this.cartRepository.getCart({ id: cart.id });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async checkProduct(userData, productSKUId) {
        try {
            const user = await this.userService.getUser(userData.id);
            const cart = await user.getCart();
            const cartItems = await cart.getCartItems();
            const items = cartItems.filter((item)=>{
                return item.ProductSKUId == productSKUId;
            });
            return items.length ? items : false;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = CartService;