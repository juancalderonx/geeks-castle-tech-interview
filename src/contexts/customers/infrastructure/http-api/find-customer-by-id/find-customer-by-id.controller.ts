import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  CustomerNotFoundException,
  CustomerPrimitive,
} from '@/customers/domain';
import { FindCustomerByIdUseCase } from '@/customers/application';

@Controller('customers')
export class FindCustomerByIdController {
  constructor(
    private readonly findCustomerByIdUseCase: FindCustomerByIdUseCase,
  ) {}

  @Get(':id')
  async run(@Param('id', ParseUUIDPipe) id: string): Promise<{
    customer: CustomerPrimitive;
  }> {
    try {
      return await this.findCustomerByIdUseCase.execute({ id });
    } catch (error) {
      if (error instanceof CustomerNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
