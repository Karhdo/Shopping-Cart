import { Product } from "./product";
import { Helpers } from "./helpers";

export class ProductRepository {
    private products: Product[] = [];

    constructor() {
        this.addItem(new Product(1, "gekkoga", "gekkoga.png", "Chúng nén nước để tạo ra phi tiêu. Thứ vũ khí này có thể cắt đôi cả kim loại nếu được xoay thật nhanh rồi ném mạnh.", 100000));
        this.addItem(new Product(2, "jukain", "jukain.png", "Jukain sở hữu tốc độ đáng nể và những chiếc lá cực bén mọc trên mình. Chúng bật nhảy vun vút trên các cành cây rồi lao vào đối thủ từ trên đỉnh đầu hoặc phía sau lưng.", 150000));
        this.addItem(new Product(3, "kamex", "kamex.png", "Kamex bắn nước từ hai khẩu súng nhô ra ở mai. Với độ chuẩn xác cực cao, những phát đạn nước có thể nhắm trúng lon rỗng cách xa 50 mét.", 90000));
        this.addItem(new Product(4, "lizardon", "lizardon.png", "Lizardon khè ra lửa với sức nóng đến đá tảng cũng tan chảy, nó còn có thể gây ra cháy rừng.", 200000));
        this.addItem(new Product(5, "kyukon", "kyukon.png", "Mỗi chiếc đuôi đều chứa sức mạnh. Người ta đồn đại rằng Kyukon sống đến một nghìn năm.", 70000, false));
        this.addItem(new Product(6, "pikachu", "pikachu.png", "Những Pikachu có thể tạo ra dòng điện càng mạnh thì túi má càng mềm mại và lớn nhanh.", 90000));
    }

    addItem(product: Product) {
        this.products.push(product);
    }

    getItems(): Product[] {
        return this.products;
    }

    getItemsByID(id: number): Product {
        let numOfProducts: number = this.products.length;

        for (let i: number = 0; i < numOfProducts; i++) {
            if (this.products[i].id == id) {
                return this.products[i];
            }
        }

        return null;
    }

    showItemsInHTML(): string {
        let numOfProducts: number = this.products.length;
        let xhtmlResult: string = "";

        if (numOfProducts > 0) {
            for (let i: number = 0; i < numOfProducts; i++) {
                let currentItem: Product = this.products[i];

                xhtmlResult += `<div class="media product">
                                    <img class="mr-3" src="./img/${currentItem.name}.png" alt="${currentItem.name}" />
                                    <div class="media-body">
                                        <div class="body__product-info">
                                            <h5 class="mt-0 body__name">${currentItem.name}</h5>
                                            <span class="body__description">${currentItem.description}</span>
                                        </div>
                                        <div class="mt-2 body__product-money">
                                            ${this.showBuyItem(this.products[i])}
                                        </div>
                                    </div>
                                </div>
                `;
            }
        } else {
            xhtmlResult = "Empty product in my shop";
        }

        return xhtmlResult;
    }

    private showBuyItem(product: Product): string {
        let xhtmlResult: string = "";

        if (product.canBuy == true) {
            xhtmlResult = ` <input type="number" name="quantity-product-${product.id}" value="1" min="1" />
                            <a data-product="${product.id}" href="#" class="product-price">
                                ${Helpers.toCurrencyVDN(product.price)}
                            </a>`;
        } else {
            xhtmlResult = ` <input type="number" name="quantity-product-${product.id}" disabled value="1" min="1" />
                            <span data-product="${product.id}" href="#" class="product-price">
                                ${Helpers.toCurrencyVDN(product.price)}
                            </span>`;
        }

        return xhtmlResult;
    }
}
