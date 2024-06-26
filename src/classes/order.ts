import OrderStatus from './interfaces/order-status';
import ShoppingCart from './shopping-cart';
import Messaging from '../services/messaging';
import Persistency from '../services/persistency';
import { ICustomerOrder } from './interfaces/costumer-protocol';

export default class Order {
  private _orderStatus: OrderStatus = 'opened';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
    private readonly custumer: ICustomerOrder,
  ) {}

  get orderStatus(): 'opened' | 'closed' {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Seu carrinho está vazio ');
      return;
    }
    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `O seu pedido com o total de ${this.cart.total()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
    console.log(
      `O Cliente é ${this.custumer.getName()} - ${this.custumer.getIDN()}`,
    );
  }

  private isEmpty(): boolean {
    return this.cart.itens.length === 0;
  }
}
