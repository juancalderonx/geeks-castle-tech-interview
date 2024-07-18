import { Injectable } from '../../../../shared/dependency-injection/injectable';
import {
  CustomerRepository,
  CustomerPrimitive,
  Customer,
} from '../../../domain';
import { CreateCustomerDto } from './create-customer.dto';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(createCustomerDto: CreateCustomerDto): Promise<{
    customer: CustomerPrimitive;
  }> {
    const { name, lastName, birthdate } = createCustomerDto;

    if (!birthdate) throw new Error('Date of birth is required');

    const customer = Customer.create({
      name,
      lastName,
      birthdate: new Date(birthdate),
      age: 0, // This is a default value, Firestore will calculate the age
    });

    await this.customerRepository.save(customer);

    return { customer: customer.toValue() };
  }
}
