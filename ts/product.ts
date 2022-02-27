export class Product {
    private _id: number;
    private _name: string;
    private _image: string;
    private _description: string;
    private _price: number;
    private _canBuy: boolean;

    constructor(id: number, name: string, image: string, description: string, price: number, canBuy: boolean = true) {
        this._id = id;
        this._name = name;
        this._image = image;
        this._description = description;
        this._price = price;
        this._canBuy = canBuy;
    }

    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

    public get image(): string {
        return this._image;
    }
    public set image(v: string) {
        this._image = v;
    }

    public get description(): string {
        return this._description;
    }
    public set description(v: string) {
        this._description = v;
    }

    public get price(): number {
        return this._price;
    }
    public set price(v: number) {
        this._price = v;
    }

    public get canBuy(): boolean {
        return this._canBuy;
    }
    public set canBuy(v: boolean) {
        this._canBuy = v;
    }
}
