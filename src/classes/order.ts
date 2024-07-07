import { OrderStatus } from './interfaces/order-status';
import { ShoppingCartProtocol } from './interfaces/shoping-cart-protocol';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';
import { CustomerOrderprotocol } from './interfaces/custumer-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'opened';

  constructor(
    private readonly shoppingCart: ShoppingCartProtocol,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
    private readonly custumer: CustomerOrderprotocol,
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
      `O seu pedido com o total de ${this.shoppingCart.total()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.shoppingCart.clear();
    console.log(
      `O Cliente é ${this.custumer.getName()} - ${this.custumer.getIDN()}`,
    );
  }

  private isEmpty(): boolean {
    // return this.shoppingCart.items.length === 0;
    return this.shoppingCart.isEmpty();
  }
}
