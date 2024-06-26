import ICartItens from './interfaces/cart-itens';

export default class Product implements ICartItens {
  constructor(
    public name: string,
    public price: number,
  ) {}
}
