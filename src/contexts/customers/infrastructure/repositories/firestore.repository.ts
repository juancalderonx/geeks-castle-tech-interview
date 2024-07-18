import {
  Customer,
  CustomerNotFoundException,
  CustomerPrimitive,
  CustomerRepository,
} from '@/customers/domain';
import { Injectable } from '@/src/contexts/shared/dependency-injection/injectable';
import { FirebaseConfigService } from '@/src/contexts/shared/firebase/firebase-config.service';
import { Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreCustomerRepository implements CustomerRepository {
  private collection: admin.firestore.CollectionReference;

  constructor(
    @Inject(FirebaseConfigService)
    firebaseConfigService: FirebaseConfigService,
  ) {
    this.collection = firebaseConfigService
      .getFirestore()
      .collection('customers');
  }

  async save(customer: Customer): Promise<void> {
    const { id, ...customerData } = customer.toValue();
    await this.collection.doc(id).set(customerData);
  }

  async findById(customerId: string): Promise<Customer | null> {
    const doc = await this.collection.doc(customerId).get();

    if (!doc.exists) throw new CustomerNotFoundException(customerId);

    const customerPrimitive = doc.data() as CustomerPrimitive;

    customerPrimitive.birthdate = this.mapCustomerBirthday(
      customerPrimitive.birthdate,
    );

    return new Customer(customerPrimitive);
  }

  /**
   * Map the birthdate to a Date object
   * @param birthdate Birthdate to map
   * @returns Birthdate as a Date object
   */
  private mapCustomerBirthday(
    birthdate: admin.firestore.Timestamp | Date,
  ): Date {
    return birthdate instanceof admin.firestore.Timestamp
      ? birthdate.toDate()
      : birthdate;
  }
}
