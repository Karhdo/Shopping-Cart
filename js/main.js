"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("./validate");
const cart_1 = require("./cart");
const product_repository_1 = require("./product-repository");
var MyElement;
(function (MyElement) {
    MyElement.ELM_LIST_PRODUCT = "#list-product";
    MyElement.ELM_NOTIFICATION = "#mnotification";
    MyElement.ELM_CART_BODY = "#my-cart-body";
    MyElement.ELM_CART_FOOTER = "#my-cart-footer";
})(MyElement || (MyElement = {}));
var MyNotification;
(function (MyNotification) {
    MyNotification.NOTI_READY_TO_BUY = "Ready to buy product";
    MyNotification.NOTI_GATER_THAN_ONE = "Quantity must equal or greater than 1";
    MyNotification.NOTI_UPDATE_PRODUCT = "Update successfully";
    MyNotification.NOTI_REMOVE_PRODUCT = "Remove successfully";
})(MyNotification || (MyNotification = {}));
let productRepository = new product_repository_1.ProductRepository();
let products = productRepository.getItems();
let cartObj = new cart_1.Cart();
function showListProduct() {
    $(MyElement.ELM_LIST_PRODUCT).html(productRepository.showItemsInHTML());
}
function showNotification(str) {
    $(MyElement.ELM_NOTIFICATION).html(str);
}
function showCart() {
    $(MyElement.ELM_CART_BODY).html(cartObj.showCartBodyInHTML());
    $(MyElement.ELM_CART_FOOTER).html(cartObj.showCartFooterInHTML());
}
function addProduct(id, quantity) {
    if (validate_1.Validate.checkQuantity(quantity)) {
        // Add product
        let product = productRepository.getItemsByID(id);
        cartObj.addProduct(product, quantity);
        showCart();
    }
    else {
        showNotification(MyNotification.NOTI_GATER_THAN_ONE);
    }
}
function updateProduct(id, quantity) {
    if (validate_1.Validate.checkQuantity(quantity)) {
        // Add product
        let product = productRepository.getItemsByID(id);
        cartObj.updateProduct(product, quantity);
        showNotification(MyNotification.NOTI_UPDATE_PRODUCT);
        showCart();
    }
    else {
        showNotification(MyNotification.NOTI_GATER_THAN_ONE);
    }
}
function deleteProduct(id) {
    let product = productRepository.getItemsByID(id);
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
        let id = $(this).data("product");
        let quantity = Number($("input[name='quantity-product-" + id + "']").val());
        addProduct(id, quantity);
    });
    // Update Product
    $(document).on("click", "a.btn-update", function () {
        let id = $(this).data("product");
        let quantity = Number($("input[name='quantity-cart-product-" + id + "']").val());
        updateProduct(id, quantity);
    });
    // Remove Product
    $(document).on("click", "a.btn-delete", function () {
        let id = $(this).data("product");
        deleteProduct(id);
    });
});
