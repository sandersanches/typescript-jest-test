import { Discount } from './discount';
import ICartItens from './interfaces/cart-itens';

export default class ShoppingCart {
  private readonly _itens: ICartItens[] = [];

  constructor(private readonly discount: Discount) {}

  addItens(item: ICartItens) {
    this._itens.push(item);
  }

  removeItem(index: number) {
    this._itens.splice(index, 1);
  }

  get itens(): ICartItens[] {
    return this._itens;
  }

  total(): number {
    return +this._itens.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }

  totalWithDiscount(): number {
    return this.discount.calculate(this.total());
  }

  isEmpty(): boolean {
    return this._itens.length === 0;
  }

  clear() {
    console.log('O carrinho de compras foi limpo');
    this._itens.length = 0;
  }
}
