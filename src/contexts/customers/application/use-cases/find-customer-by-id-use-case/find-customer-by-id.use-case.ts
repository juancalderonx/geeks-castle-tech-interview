import { Injectable } from '../../../../shared/dependency-injection/injectable';
import {
  CustomerNotFoundException,
  CustomerPrimitive,
  CustomerRepository,
} from '../../../domain';
import { FindCustomerByIdDto } from './find-customer-by-id.dto';

@Injectable()
export class FindCustomerByIdUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(findCustomerByIdDto: FindCustomerByIdDto): Promise<{
    customer: CustomerPrimitive;
  }> {
    const customerId = findCustomerByIdDto.id;
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) throw new CustomerNotFoundException(customerId);

    return { customer: customer.toValue() };
  }
}
