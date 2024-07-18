import { v4 as uuid } from 'uuid';

export interface CustomerPrimitive {
  id: string;
  name: string;
  lastName: string;
  birthdate: Date;
  age: number;
}

export class Customer {
  constructor(private attributes: CustomerPrimitive) {}

  static create(createCustomer: {
    name: string;
    lastName: string;
    birthdate: Date;
    age: number;
  }): Customer {
    return new Customer({ id: uuid(), ...createCustomer });
  }

  toValue(): CustomerPrimitive {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      lastName: this.attributes.lastName,
      birthdate: this.attributes.birthdate,
      age: this.attributes.age,
    };
  }
}
