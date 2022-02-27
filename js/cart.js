"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const cart_item_1 = require("./cart-item");
const helpers_1 = require("./helpers");
class Cart {
    constructor() {
        this.cartItems = [];
        this.totalQuantity = 0;
        this.totalPrice = 0;
    }
    addProduct(product, quantity = 1) {
        let productPosition = this.getProductPosition(product);
        if (productPosition >= 0) {
            this.cartItems[productPosition].quantity += quantity;
        }
        else {
            let cartItem = new cart_item_1.CartItem(product, quantity);
            this.cartItems.push(cartItem);
        }
        this.totalQuantity += quantity;
        this.totalPrice += product.price * quantity;
    }
    updateProduct(product, quantity = 1) {
        let productPosition = this.getProductPosition(product);
        this.totalQuantity = this.totalQuantity - this.cartItems[productPosition].quantity + quantity;
        this.totalPrice = this.totalPrice - product.price * (this.cartItems[productPosition].quantity - quantity);
        this.cartItems[productPosition].quantity = quantity;
    }
    removeProduct(product) {
        let productPosition = this.getProductPosition(product);
        this.totalQuantity = this.totalQuantity - this.cartItems[productPosition].quantity;
        this.totalPrice = this.totalPrice - product.price * this.cartItems[productPosition].quantity;
        this.cartItems.splice(productPosition, 1);
        console.log(this.cartItems);
    }
    getProductPosition(product) {
        let numOfCartItem = this.cartItems.length;
        for (let i = 0; i < numOfCartItem; i++) {
            if (this.cartItems[i].product.id == product.id) {
                return i;
            }
        }
        return -1;
    }
    isEmpty() {
        return this.cartItems.length == 0;
    }
    getTotalQuantity() {
        let totalQuantity = this.cartItems.reduce((accumulator, cartItem) => {
            accumulator += cartItem.quantity;
            return accumulator;
        }, 0);
        return totalQuantity;
    }
    getTotalPrice() {
        let getTotalPrice = this.cartItems.reduce((accumulator, cartItem) => {
            accumulator += cartItem.getSubtotal();
            return accumulator;
        }, 0);
        return getTotalPrice;
    }
    showCartBodyInHTML() {
        let xhtmlResults = "";
        if (!this.isEmpty()) {
            xhtmlResults = this.cartItems.reduce((total, cartItem, cartIndex) => {
                total += cartItem.showCartItemInHTML(cartIndex + 1);
                return total;
            }, "");
        }
        return xhtmlResults;
    }
    showCartFooterInHTML() {
        let xhtmlResults;
        if (!this.isEmpty()) {
            xhtmlResults = `<tr>
                                <td colspan='4'>There are <b class='total-quantity'>${this.totalQuantity}</b> items in your Cart.</td>
                                <td colspan='2' class='total-money'>${helpers_1.Helpers.toCurrencyVDN(this.totalPrice)}</td>
                            </tr>`;
        }
        else {
            xhtmlResults = "<tr><th colspan='6'>Empty product in your cart</th></tr>";
        }
        return xhtmlResults;
    }
}
exports.Cart = Cart;
