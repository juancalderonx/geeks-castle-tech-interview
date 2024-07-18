import { Injectable } from '../../../shared/dependency-injection/injectable';
import { Customer, CustomerPrimitive, CustomerRepository } from '../../domain';

@Injectable()
export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: CustomerPrimitive[] = [];

  async save(customer: Customer): Promise<void> {
    this.customers.push(customer.toValue());
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.id === id);

    return customer ? new Customer(customer) : null;
  }

  update(id: string, updateData: Partial<Customer>): Promise<void> {
    const customer = this.customers.find((customer) => customer.id === id);

    const updatedCustomer = { ...customer, ...updateData };

    this.customers = this.customers.map((customer) =>
      customer.id === id ? updatedCustomer : customer,
    );

    return Promise.resolve();
  }
}
