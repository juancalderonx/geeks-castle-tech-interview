import { Injectable } from '@/shared/dependency-injection/injectable';
import {
  Customer,
  CustomerPrimitive,
  CustomerRepository,
} from '@/customers/domain';

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
}
