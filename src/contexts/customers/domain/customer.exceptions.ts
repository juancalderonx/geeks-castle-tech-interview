export class CustomerNotFoundException extends Error {
  constructor(public readonly id: string) {
    super(`Customer with id ${id} not found`);
  }
}
