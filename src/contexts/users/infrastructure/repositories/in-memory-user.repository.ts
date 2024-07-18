import { User, UserPrimitive, UserRepository } from '../../domain';
import { Injectable } from '../../../shared/dependency-injection/injectable';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: UserPrimitive[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user.toValue());
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    return user ? new User(user) : null;
  }
}
