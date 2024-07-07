/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order } from './order';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';
import { CustomerOrderprotocol } from './interfaces/custumer-protocol';
import { CartItemsProtocol } from './interfaces/cart-itens-protocol';
import { ShoppingCartProtocol } from './interfaces/shoping-cart-protocol';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItemsProtocol[]> {
    return [];
  }
  addItem(item: CartItemsProtocol): void {}
  removeItem(index: number): void {}
  total(): number {
    return 1;
  }
  totalWithDicount(): number {
    return 1;
  }
  isEmpty(): boolean {
    return false;
  }
  clear(): void {}
}

class MessagingMock implements MessagingProtocol {
  sendMessage(msg: string): void {}
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder(): void {}
}

class CustumerMock implements CustomerOrderprotocol {
  getName(): string {
    return '';
  }
  getIDN(): string {
    return '';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistencyMock = new PersistencyMock();
  const custumerMock = new CustumerMock();
  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    custumerMock,
  );

  return {
    sut,
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    custumerMock,
  };
};

afterEach(() => jest.clearAllMocks()); //Limpar os mocks após cada teste

describe('order', () => {
  it('should not checkout if ShoppingCart is Empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('opened');
  });

  it('should send a e-mail to custumer', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistencyMock } = createSut();
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkout();
    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
