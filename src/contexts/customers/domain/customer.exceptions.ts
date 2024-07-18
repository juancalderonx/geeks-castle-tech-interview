export class CustomerNotFoundException extends Error {
  constructor(public readonly id: string) {
    super(`Customer with id ${id} not found`);
  }
}

export class InvalidBirthdateException extends Error {
  constructor() {
    super('Invalid birthdate');
  }
}
