import { User, UserPrimitive, UserRepository } from '../../../domain';
import { Injectable } from '../../../../shared/dependency-injection/injectable';
import { PasswordService } from '../../user-password/user-password.service';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    createUserDto: CreateUserDto,
  ): Promise<{ user: UserPrimitive }> {
    let password: string = '';

    if (createUserDto.password) {
      password = await PasswordService.validateAndHashPassword(
        createUserDto.password,
      );
    }

    const user = User.create({ ...createUserDto, password });

    await this.userRepository.save(user);

    return { user: user.toValue() };
  }
}
