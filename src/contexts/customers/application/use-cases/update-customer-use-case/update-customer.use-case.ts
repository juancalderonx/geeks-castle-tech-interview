import { Injectable } from '../../../../shared/dependency-injection/injectable';
import {
  CustomerRepository,
  Customer,
  CustomerNotFoundException,
  InvalidBirthdateException,
  CustomerPrimitive,
} from '../../../domain';
import { UpdateCustomerDto } from './update-customer.dto';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(
    customerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<{
    customer: CustomerPrimitive;
  }> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) throw new CustomerNotFoundException(customerId);

    const birthdate = new Date(updateCustomerDto.birthdate);

    if (birthdate > new Date()) throw new InvalidBirthdateException();

    const updateData: Partial<Customer> = {
      ...updateCustomerDto,
    } as Partial<Customer>;

    await this.customerRepository.update(customerId, updateData);

    return { customer: customer.toValue() };
  }
}
