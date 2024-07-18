import { Module } from '@nestjs/common';
import { CreateUserController } from './http-api/create-user/create-user.controller';
import { CreateUserUseCase, FindUserByIdUseCase } from '../application';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';
import { UserRepository } from '@/contexts/users/domain';
import { FindUserByIdController } from './http-api/find-user-by-id/find-user-by-id.controller';

@Module({
  controllers: [CreateUserController, FindUserByIdController],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    InMemoryUserRepository,
    {
      provide: UserRepository,
      useExisting: InMemoryUserRepository,
    },
  ],
  exports: [CreateUserUseCase, FindUserByIdUseCase],
})
export class UserModule {}
