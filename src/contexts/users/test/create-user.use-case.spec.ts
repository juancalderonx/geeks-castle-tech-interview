import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../application/use-cases/create-user-use-case';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserRepository: any;

  beforeEach(async () => {
    mockUserRepository = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);

    jest.spyOn(User, 'create').mockImplementation(
      (userDto) =>
        ({
          ...userDto,
          id: 'b0af5467-b654-40cd-8f70-744c4fc1ae81',
          password: 'Secret123.',
          toValue() {
            return { ...this };
          },
        }) as any,
    );
  });

  it('should create a user', async () => {
    const userDto = {
      name: 'Juan',
      username: 'juancalderonx',
      password: 'Secret123.',
    };

    await createUserUseCase.execute(userDto);

    expect(mockUserRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'b0af5467-b654-40cd-8f70-744c4fc1ae81',
        name: 'Juan',
        username: 'juancalderonx',
        password: 'Secret123.',
      }),
    );
  });
});
