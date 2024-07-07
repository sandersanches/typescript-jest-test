import { CartItemsProtocol } from './cart-itens-protocol';

export interface ShoppingCartProtocol {
  items: Readonly<CartItemsProtocol[]>;
  addItem(item: CartItemsProtocol): void;
  removeItem(index: number): void;
  total(): number;
  totalWithDicount(): number;
  isEmpty(): boolean;
  clear(): void;
}
