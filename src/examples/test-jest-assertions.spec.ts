describe('Primitive Values', () => {
  it('shoud test jest assetions', () => {
    const number = 10;
    expect(number).toBe(10); // O valor é o mesmo? // Checa com Object.is // Não funiona com objetos
    expect(number).toEqual(10); // O valor é igual? // Funciona com objetos

    expect(number).not.toBeNull(); // O valor não é nulo?
    expect(number).not.toBeFalsy(); // O valor não é falso?
    expect(number).toBeTruthy(); // O valor é verdadiro?
  });

  it('should split tests', () => {
    const number = 10;
    expect(number).toBe(10); // O valor é o mesmo? // Checa com Object.is // Não funiona com objetos
    expect(number).toEqual(10); // O valor é igual? // Funciona com objetos

    expect(number).not.toBeNull(); // O valor não é nulo?
    expect(number).not.toBeFalsy(); // O valor não é falso?
    expect(number).toBeTruthy(); // O valor é verdadiro?
  });
});

describe('Objects', () => {
  it('shoud test jest assetions with objects', () => {
    const person = { name: 'Sander', age: 35 };
    const anotherPerson = { ...person };

    expect(person).toEqual(anotherPerson); // Verifica se os objetos são iguais
    expect(person).toHaveProperty('age'); // Verifica se os objetos contem a propriedade 'age'
    expect(person).toHaveProperty('age', 35); // Verifica se os objetos contem a propriedade 'age' e tem o valor 30
    expect(person).not.toHaveProperty('lastName'); // Verifica se os objetos não contem a propriedade 'age'
    expect(person.name).toBe('Sander'); // Verifica se a propriedade name do objeto person possui o valor 'sander'
  });
});
