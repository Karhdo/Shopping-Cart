import { Product } from "./product";
import { Helpers } from "./helpers";

export class CartItem {
    private _product: Product;
    private _quantity: number;

    constructor(product: Product, quantity: number) {
        this._product = product;
        this._quantity = quantity;
    }

    showCartItemInHTML(index: number): string {
        return `<tr>
                    <td>${index}</td>
                    <td>${this._product.name}</td>
                    <td>${Helpers.toCurrencyVDN(this._product.price)}</td>
                    <td><input name='quantity-cart-product-${this._product.id}' type="number" min='1' value=${this._quantity}></td>
                    <td><strong>${Helpers.toCurrencyVDN(this.getSubtotal())}</strong></td>
                    <td>
                        <a href="#" data-product='${this._product.id}' class="btn btn-update btn-primary">Update</a>
                        <a href="#" data-product='${this._product.id}' class="btn btn-delete btn-danger">Delete</a>
                    </td>
                </tr>`;
    }

    getSubtotal(): number {
        return this._product.price * this._quantity;
    }

    get product(): Product {
        return this._product;
    }

    set product(v: Product) {
        this._product = v;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(v: number) {
        this._quantity = v;
    }
}
