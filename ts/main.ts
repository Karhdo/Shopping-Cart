import { Product } from "./product";
import { Validate } from "./validate";
import { Cart } from "./cart";
import { ProductRepository } from "./product-repository";
import { CartItem } from "./cart-item";

namespace MyElement {
    export const ELM_LIST_PRODUCT: string = "#list-product";
    export const ELM_NOTIFICATION: string = "#mnotification";
    export const ELM_CART_BODY: string = "#my-cart-body";
    export const ELM_CART_FOOTER: string = "#my-cart-footer";
}

namespace MyNotification {
    export const NOTI_READY_TO_BUY: string = "Ready to buy product";
    export const NOTI_GATER_THAN_ONE: string = "Quantity must equal or greater than 1";
    export const NOTI_UPDATE_PRODUCT: string = "Update successfully";
    export const NOTI_REMOVE_PRODUCT: string = "Remove successfully";
}

let productRepository = new ProductRepository();
let products: Product[] = productRepository.getItems();
let cartObj = new Cart();

function showListProduct(): void {
    $(MyElement.ELM_LIST_PRODUCT).html(productRepository.showItemsInHTML());
}

function showNotification(str: string): void {
    $(MyElement.ELM_NOTIFICATION).html(str);
}

function showCart(): void {
    $(MyElement.ELM_CART_BODY).html(cartObj.showCartBodyInHTML());
    $(MyElement.ELM_CART_FOOTER).html(cartObj.showCartFooterInHTML());
}

function addProduct(id: number, quantity: number): void {
    if (Validate.checkQuantity(quantity)) {
        // Add product
        let product: Product = productRepository.getItemsByID(id);

        cartObj.addProduct(product, quantity);
        showCart();
    } else {
        showNotification(MyNotification.NOTI_GATER_THAN_ONE);
    }
}

function updateProduct(id: number, quantity: number): void {
    if (Validate.checkQuantity(quantity)) {
        // Add product
        let product: Product = productRepository.getItemsByID(id);

        cartObj.updateProduct(product, quantity);
        showNotification(MyNotification.NOTI_UPDATE_PRODUCT);
        showCart();
    } else {
        showNotification(MyNotification.NOTI_GATER_THAN_ONE);
    }
}

function deleteProduct(id: number): void {
    let product: Product = productRepository.getItemsByID(id);

    cartObj.removeProduct(product);
    showNotification(MyNotification.NOTI_REMOVE_PRODUCT);
    showCart();
}

$(() => {
    // Show list products
    showListProduct();

    // Show cart
    showCart();

    // Update notify
    showNotification(MyNotification.NOTI_READY_TO_BUY);

    // Buy product
    $("a.product-price").on("click", function () {
        let id: number = $(this).data("product");
        let quantity: number = Number($("input[name='quantity-product-" + id + "']").val());

        addProduct(id, quantity);
    });

    // Update Product
    $(document).on("click", "a.btn-update", function () {
        let id: number = $(this).data("product");
        let quantity: number = Number($("input[name='quantity-cart-product-" + id + "']").val());

        updateProduct(id, quantity);
    });

    // Remove Product
    $(document).on("click", "a.btn-delete", function () {
        let id: number = $(this).data("product");

        deleteProduct(id);
    });
});
