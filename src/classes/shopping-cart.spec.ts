import { TenPercentDiscount } from './discount';
import ShoppingCart from './shopping-cart';
import ICartItens from './interfaces/cart-itens';

const createDiscountMock = () => {
  class DiscountMock extends TenPercentDiscount {}
  return new DiscountMock();
};

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { discountMock, sut };
};

const createCartItems = (name: string, price: number) => {
  class CartItems implements ICartItens {
    constructor(
      public name: string,
      public price: number,
    ) {}
  }
  return new CartItems(name, price);
};

const createSutWithCartItems = () => {
  const { sut, discountMock } = createSut();
  const cartItem1 = createCartItems('maça', 4);
  const cartItem2 = createCartItems('banana', 6);

  sut.addItens(cartItem1);
  sut.addItens(cartItem2);

  return { discountMock, sut };
};

afterEach(() => jest.clearAllMocks()); //Limpar os mocks após cada teste

describe('ShoppingCart', () => {
  it('should be an empty cart when no products is added', () => {
    const { sut } = createSut();

    expect(sut.isEmpty()).toBe(true);
  });

  it('should have 2 cart items', () => {
    const { sut } = createSutWithCartItems();

    expect(sut.itens.length).toBe(2);
  });

  it('should teste total and totalWithDiscount', () => {
    const { sut } = createSutWithCartItems();

    expect(sut.total()).toBe(10);
    expect(sut.totalWithDiscount()).toBe(9);
  });

  it('should add cartItems and clear cart', () => {
    const { sut } = createSutWithCartItems();
    expect(sut.itens.length).toBe(2);
    sut.clear();
    expect(sut.itens.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should remove cartItems', () => {
    const { sut } = createSutWithCartItems();
    sut.removeItem(1);
    expect(sut.itens.length).toBe(1);
    sut.removeItem(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should call discount.calculate once when totalWhithDiscount is called', () => {
    const { sut, discountMock } = createSutWithCartItems();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call discount.calculate with total price when totalWhithDiscount is called', () => {
    const { sut, discountMock } = createSutWithCartItems();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
