import { Module } from '@nestjs/common';
import { FirebaseModule } from '../../shared/firebase/firebase.module';
import { CreateCustomerUseCase, FindCustomerByIdUseCase } from '../application';
import { FirestoreCustomerRepository } from './repositories/firestore.repository';
import { CustomerRepository } from '../domain';
import { CreateCustomerController } from './http-api/create-customer/create-customer.controller';
import { FindCustomerByIdController } from './http-api/find-customer-by-id/find-customer-by-id.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [CreateCustomerController, FindCustomerByIdController],
  providers: [
    CreateCustomerUseCase,
    FindCustomerByIdUseCase,
    FirestoreCustomerRepository,
    {
      provide: CustomerRepository,
      useExisting: FirestoreCustomerRepository,
    },
  ],
  exports: [CreateCustomerUseCase, FindCustomerByIdUseCase],
})
export class CustomerModule {}
