import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "src/app/pages/products/interface/product.interface";

@Injectable(
    {providedIn: 'root'}
)

export class ShoppingCartService {
    products : Product[] = [];

    private cartSubject = new Subject<Product[]>();
    private totalSubject = new Subject<number>();
    private quantitySubject = new Subject<number>();

    get TotalAction$(): Observable<number> {
        return this.totalSubject.asObservable();
    }

    get QuantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }

    get cartAction$(): Observable<Product[]> {
        return this.cartSubject.asObservable();
    }


    updateCart(product:Product): void {
        this.addToCart(product);
        this.quantityProducts();
        this.calcTotal();
    }

    private calcTotal(): void {
        const total = this.products.reduce((acc, prod) => acc += prod.price, 0);
        this.totalSubject.next(total);
    }

    private quantityProducts(): void {
        const quantity = this.products.length;
        this.quantitySubject.next(quantity);
    }

    private addToCart(product: Product): void {
        this.products.push(product);
        this.cartSubject.next(this.products);
    }
}
