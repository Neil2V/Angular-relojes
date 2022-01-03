export class Product {
    id?: number;
    name: String;
    price: number;

    constructor(name: String, price: number){
        this.name = name;
        this.price = price;
    }
}
