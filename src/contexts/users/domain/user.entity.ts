import { v4 as uuid } from 'uuid';

export interface UserPrimitive {
  id: string;
  name: string;
  username: string;
  password: string;
}

export class User {
  constructor(private attributes: UserPrimitive) {}

  static create(createUser: {
    name: string;
    username: string;
    password: string;
  }): User {
    return new User({ id: uuid(), ...createUser });
  }

  toValue(): UserPrimitive {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      username: this.attributes.username,
      password: this.attributes.password,
    };
  }
}
