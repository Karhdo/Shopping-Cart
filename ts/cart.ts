import { Product } from "./product";
import { CartItem } from "./cart-item";
import { Helpers } from "./helpers";

export class Cart {
    private cartItems: CartItem[] = [];
    private totalQuantity: number = 0;
    private totalPrice: number = 0;

    addProduct(product: Product, quantity: number = 1): void {
        let productPosition: number = this.getProductPosition(product);

        if (productPosition >= 0) {
            this.cartItems[productPosition].quantity += quantity;
        } else {
            let cartItem: CartItem = new CartItem(product, quantity);
            this.cartItems.push(cartItem);
        }

        this.totalQuantity += quantity;
        this.totalPrice += product.price * quantity;
    }

    updateProduct(product: Product, quantity: number = 1): void {
        let productPosition: number = this.getProductPosition(product);

        this.totalQuantity = this.totalQuantity - this.cartItems[productPosition].quantity + quantity;
        this.totalPrice = this.totalPrice - product.price * (this.cartItems[productPosition].quantity - quantity);

        this.cartItems[productPosition].quantity = quantity;
    }

    removeProduct(product: Product): void {
        let productPosition: number = this.getProductPosition(product);

        this.totalQuantity = this.totalQuantity - this.cartItems[productPosition].quantity;
        this.totalPrice = this.totalPrice - product.price * this.cartItems[productPosition].quantity;

        this.cartItems.splice(productPosition, 1);

        console.log(this.cartItems);
    }

    private getProductPosition(product: Product): number {
        let numOfCartItem = this.cartItems.length;
        for (let i: number = 0; i < numOfCartItem; i++) {
            if (this.cartItems[i].product.id == product.id) {
                return i;
            }
        }
        return -1;
    }

    isEmpty(): boolean {
        return this.cartItems.length == 0;
    }

    getTotalQuantity(): number {
        let totalQuantity: number = this.cartItems.reduce((accumulator: number, cartItem: CartItem) => {
            accumulator += cartItem.quantity;
            return accumulator;
        }, 0);

        return totalQuantity;
    }

    getTotalPrice(): number {
        let getTotalPrice: number = this.cartItems.reduce((accumulator: number, cartItem: CartItem) => {
            accumulator += cartItem.getSubtotal();
            return accumulator;
        }, 0);

        return getTotalPrice;
    }

    showCartBodyInHTML(): string {
        let xhtmlResults: string = "";

        if (!this.isEmpty()) {
            xhtmlResults = this.cartItems.reduce((total, cartItem, cartIndex) => {
                total += cartItem.showCartItemInHTML(cartIndex + 1);
                return total;
            }, "");
        }

        return xhtmlResults;
    }

    showCartFooterInHTML(): string {
        let xhtmlResults: string;

        if (!this.isEmpty()) {
            xhtmlResults = `<tr>
                                <td colspan='4'>There are <b class='total-quantity'>${this.totalQuantity}</b> items in your Cart.</td>
                                <td colspan='2' class='total-money'>${Helpers.toCurrencyVDN(this.totalPrice)}</td>
                            </tr>`;
        } else {
            xhtmlResults = "<tr><th colspan='6'>Empty product in your cart</th></tr>";
        }

        return xhtmlResults;
    }
}
