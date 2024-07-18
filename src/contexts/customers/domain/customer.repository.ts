import { Customer } from '@/customers/domain/customer.entity';

export abstract class CustomerRepository {
  abstract save(customer: Customer): Promise<void>;
  abstract findById(id: string): Promise<Customer | null>;
}
