import { IndivivualCustumer, EnterpriseCustumer } from './custumer';

const createIndivivualCustumer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndivivualCustumer => {
  return new IndivivualCustumer(firstName, lastName, cpf);
};

const createEnterpriseCustumer = (
  name: string,
  cnpj: string,
): EnterpriseCustumer => {
  return new EnterpriseCustumer(name, cnpj);
};

afterEach(() => jest.clearAllMocks()); //Limpar os mocks após cada teste

describe('IndividualCustumer', () => {
  it('should have firstName, lastName and cpf', () => {
    const sut = createIndivivualCustumer('Sander', 'Sanches', '000.111.222-33');
    expect(sut).toHaveProperty('firstName', 'Sander');
    expect(sut).toHaveProperty('lastName', 'Sanches');
    expect(sut).toHaveProperty('cpf', '000.111.222-33');
  });
  it('should have methods get name and idn for IndivivualCustumer', () => {
    const sut = createIndivivualCustumer('Sander', 'Sanches', '000.111.222-33');
    expect(sut.getName()).toBe('Sander Sanches');
    expect(sut.getIDN()).toBe('000.111.222-33');
  });
});

describe('EnterpriseCustumer', () => {
  it('should have name and cnpj', () => {
    const sut = createEnterpriseCustumer('SSV Engenharia', '111100001111');
    expect(sut).toHaveProperty('name', 'SSV Engenharia');
    expect(sut).toHaveProperty('cnpj', '111100001111');
  });

  it('should have methods get name and idn for EnterpriseCustumer', () => {
    const sut = createEnterpriseCustumer('SSV Engenharia', '111100001111');
    expect(sut.getName()).toBe('SSV Engenharia');
    expect(sut.getIDN()).toBe('111100001111');
  });
});
