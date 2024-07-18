import { User, UserPrimitive, UserRepository } from '@/contexts/users/domain';
import { CreateUserDto } from './create-user.dto';
import { Injectable } from '@/src/contexts/shared/dependency-injection/injectable';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    createUserDto: CreateUserDto,
  ): Promise<{ user: UserPrimitive }> {
    const user = User.create(createUserDto);

    await this.userRepository.save(user);

    return { user: user.toValue() };
  }
}
