"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const helpers_1 = require("./helpers");
class CartItem {
    constructor(product, quantity) {
        this._product = product;
        this._quantity = quantity;
    }
    showCartItemInHTML(index) {
        return `<tr>
                    <td>${index}</td>
                    <td>${this._product.name}</td>
                    <td>${helpers_1.Helpers.toCurrencyVDN(this._product.price)}</td>
                    <td><input name='quantity-cart-product-${this._product.id}' type="number" min='1' value=${this._quantity}></td>
                    <td><strong>${helpers_1.Helpers.toCurrencyVDN(this.getSubtotal())}</strong></td>
                    <td>
                        <a href="#" data-product='${this._product.id}' class="btn btn-update btn-primary">Update</a>
                        <a href="#" data-product='${this._product.id}' class="btn btn-delete btn-danger">Delete</a>
                    </td>
                </tr>`;
    }
    getSubtotal() {
        return this._product.price * this._quantity;
    }
    get product() {
        return this._product;
    }
    set product(v) {
        this._product = v;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(v) {
        this._quantity = v;
    }
}
exports.CartItem = CartItem;
