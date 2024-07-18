import {
  User,
  UserNotFoundException,
  UserPrimitive,
  UserRepository,
} from '@/contexts/users/domain';
import { firestore } from '../firebase/firebase.config';

export class FirestoreRepository implements UserRepository {
  private collection = firestore.collection('users');

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
