import { Module } from '@nestjs/common';
import { CreateUserController } from './http-api/create-user/create-user.controller';
import { CreateUserUseCase, FindUserByIdUseCase } from '../application';
import { UserRepository } from '../domain';
import { FindUserByIdController } from './http-api/find-user-by-id/find-user-by-id.controller';
import { FirestoreUserRepository } from './repositories/firestore.repository';
import { FirebaseModule } from '../../shared/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [CreateUserController, FindUserByIdController],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FirestoreUserRepository,
    {
      provide: UserRepository,
      useExisting: FirestoreUserRepository,
    },
  ],
  exports: [CreateUserUseCase, FindUserByIdUseCase],
})
export class UserModule {}
