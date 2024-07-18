import { Module } from '@nestjs/common';
import { CreateUserController } from './http-api/create-user/create-user.controller';
import { CreateUserUseCase, FindUserByIdUseCase } from '../application';
import { UserRepository } from '@/contexts/users/domain';
import { FindUserByIdController } from './http-api/find-user-by-id/find-user-by-id.controller';
import { FirestoreRepository } from './repositories/firestore.repository';

@Module({
  controllers: [CreateUserController, FindUserByIdController],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FirestoreRepository,
    {
      provide: UserRepository,
      useExisting: FirestoreRepository,
    },
  ],
  exports: [CreateUserUseCase, FindUserByIdUseCase],
})
export class UserModule {}
