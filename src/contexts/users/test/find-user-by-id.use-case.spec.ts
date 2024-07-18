import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id-use-case';
import { UserRepository } from '../domain/user.repository';

describe('FindUserByIdUseCase', () => {
  let findUserByIdUseCase: FindUserByIdUseCase;
  let mockUserRepository: any;

  beforeEach(async () => {
    mockUserRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdUseCase,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    findUserByIdUseCase = module.get<FindUserByIdUseCase>(FindUserByIdUseCase);
  });

  it('should return the user when found', async () => {
    const findUserByIdDto = {
      id: 'b0af5467-b654-40cd-8f70-744c4fc1ae81',
    };

    const user = {
      id: 'b0af5467-b654-40cd-8f70-744c4fc1ae81',
      name: 'Juan',
      username: 'juancalderonx',
      password: 'Secret123.',
      toValue() {
        return { ...this };
      },
    };

    jest.spyOn(mockUserRepository, 'findById').mockResolvedValue(user);

    const result = await findUserByIdUseCase.execute(findUserByIdDto);

    expect(result).toEqual({ user });
    expect(mockUserRepository.findById).toHaveBeenCalledWith(
      findUserByIdDto.id,
    );
  });

  it('should throw UserNotFoundException when user is not found', async () => {
    const findUserByIdDto = {
      id: 'b0af5467-b654-40cd-8f70-744c4fc1ae81',
    };

    jest.spyOn(mockUserRepository, 'findById').mockResolvedValue(null);

    await expect(findUserByIdUseCase.execute(findUserByIdDto)).rejects.toThrow(
      'User with id b0af5467-b654-40cd-8f70-744c4fc1ae81 not found',
    );
  });
});
