import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/use-cases/create-user-use-case';
import { CreateUserHttpDto } from './create-user.http-dto';
import { UserPrimitive } from '../../../domain';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async run(@Body() createUserHttpDto: CreateUserHttpDto): Promise<{
    user: UserPrimitive;
  }> {
    return await this.createUserUseCase.execute({
      name: createUserHttpDto.name,
      username: createUserHttpDto.username,
      password: createUserHttpDto.password,
    });
  }
}
