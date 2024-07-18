import { User } from '../domain';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
}
