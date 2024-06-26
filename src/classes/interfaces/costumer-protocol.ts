export interface ICustomerOrder {
  getName(): string;
  getIDN(): string;
}

export interface IIndividualCustumerProtocol {
  firstName: string;
  lastName: string;
  cpf: string;
}

export interface IEnterpriseCustumerProtocol {
  name: string;
  cnpj: string;
}
