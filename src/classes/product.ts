import { CartItemsProtocol } from './interfaces/cart-itens-protocol';

export class Product implements CartItemsProtocol {
  constructor(
    public name: string,
    public price: number,
  ) {}
}
