import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerUseCase } from '../../../application/use-cases/create-customer-use-case';
import { CustomerPrimitive } from '../../../domain';
import { CreateCustomerHttpDto } from './create-customer.http-dto';

@Controller('customers')
export class CreateCustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  async run(@Body() createCustomerHttpDto: CreateCustomerHttpDto): Promise<{
    customer: CustomerPrimitive;
  }> {
    return await this.createCustomerUseCase.execute({
      name: createCustomerHttpDto.name,
      birthdate: createCustomerHttpDto.birthday,
      lastName: createCustomerHttpDto.lastName,
    });
  }
}
