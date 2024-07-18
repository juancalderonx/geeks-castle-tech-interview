import {
  User,
  UserNotFoundException,
  UserPrimitive,
  UserRepository,
} from '@/contexts/users/domain';
import { FirebaseConfigService } from '@/src/contexts/shared/firebase/firebase-config.service';
import { Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

export class FirestoreRepository implements UserRepository {
  private collection: admin.firestore.CollectionReference;

  constructor(
    @Inject(FirebaseConfigService)
    firebaseConfigService: FirebaseConfigService,
  ) {
    this.collection = firebaseConfigService.getFirestore().collection('users');
  }

  async save(user: User): Promise<void> {
    const { id } = user.toValue();
    await this.collection.doc(id).set(user.toValue());
  }

  async findById(userId: string): Promise<User | null> {
    const doc = await this.collection.doc(userId).get();

    if (!doc.exists) throw new UserNotFoundException(userId);

    const user = doc.data() as UserPrimitive;

    return user ? new User(user) : null;
  }
}
