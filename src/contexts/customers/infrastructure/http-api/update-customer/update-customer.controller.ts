import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { UpdateCustomerUseCase } from '../../../application';
import { UpdateCustomerHttpDto } from './update-customer.http-dto';
import {
  CustomerNotFoundException,
  CustomerPrimitive,
  InvalidBirthdateException,
} from '../../../domain';

@Controller('customers')
export class UpdateCustomerController {
  constructor(private readonly updateCustomerUseCase: UpdateCustomerUseCase) {}

  @Patch(':customerId')
  async run(
    @Param('customerId') customerId: string,
    @Body() updateCustomerHttpDto: UpdateCustomerHttpDto,
  ): Promise<{
    customer: CustomerPrimitive;
  }> {
    try {
      return await this.updateCustomerUseCase.execute(customerId, {
        name: updateCustomerHttpDto.name,
        birthdate: updateCustomerHttpDto.birthdate,
        lastName: updateCustomerHttpDto.lastName,
      });
    } catch (error) {
      if (error instanceof CustomerNotFoundException) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof InvalidBirthdateException) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}
