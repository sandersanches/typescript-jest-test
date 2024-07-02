import { PersistencyProtocol } from '../classes/interfaces/persistency-protocol';

export default class Persistency implements PersistencyProtocol {
  saveOrder(): void {
    console.log('Pedido salvo com sucesso...');
  }
}
