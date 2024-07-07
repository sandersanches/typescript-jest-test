import { Discount } from './discount';
import { CartItemsProtocol } from './interfaces/cart-itens-protocol';
import { ShoppingCartProtocol } from './interfaces/shoping-cart-protocol';

export class ShoppingCart implements ShoppingCartProtocol {
  private readonly _items: CartItemsProtocol[] = [];

  constructor(private readonly discount: Discount) {}

  addItem(item: CartItemsProtocol) {
    this._items.push(item);
  }

  removeItem(index: number) {
    this._items.splice(index, 1);
  }

  get items(): CartItemsProtocol[] {
    return this._items;
  }

  total(): number {
    return +this._items.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }

  totalWithDicount(): number {
    return this.discount.calculate(this.total());
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear() {
    console.log('O carrinho de compras foi limpo');
    this._items.length = 0;
  }
}
