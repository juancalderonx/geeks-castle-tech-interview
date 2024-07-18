import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FindUserByIdUseCase } from '@/contexts/users/application';
import { UserNotFoundException, UserPrimitive } from '@/contexts/users/domain';

@Controller('users')
export class FindUserByIdController {
  constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}

  @Get(':id')
  async run(@Param('id', ParseUUIDPipe) id: string): Promise<{
    user: UserPrimitive;
  }> {
    try {
      return await this.findUserByIdUseCase.execute({ id });
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
