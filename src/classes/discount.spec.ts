import {
  Discount,
  NoDiscount,
  FiftyPercentDiscount,
  TenPercentDiscount,
} from './discount';

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe('Discount', () => {
  afterEach(() => jest.clearAllMocks()); //Limpar os mocks após cada teste

  it('should have no discount', () => {
    const sut = createSut(NoDiscount);
    expect(sut.calculate(10.99)).toBeCloseTo(10.99);
  });

  it('should have 50% discount on price', () => {
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(30.88)).toBeCloseTo(15.44);
  });

  it('should have 10% discount on price', () => {
    const sut = createSut(TenPercentDiscount);
    expect(sut.calculate(90)).toBeCloseTo(81);
  });
});
