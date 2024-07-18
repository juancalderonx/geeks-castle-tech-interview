import { Test, TestingModule } from '@nestjs/testing';
import {
  FindCustomerByIdUseCase,
  FindCustomerByIdDto,
} from '../application/use-cases/find-customer-by-id-use-case';
import { CustomerNotFoundException, CustomerRepository } from '../domain';

describe('FindCustomerByIdUseCase', () => {
  let useCase: FindCustomerByIdUseCase;
  let mockCustomerRepository: any;

  beforeEach(async () => {
    mockCustomerRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCustomerByIdUseCase,
        {
          provide: CustomerRepository,
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    useCase = module.get<FindCustomerByIdUseCase>(FindCustomerByIdUseCase);
  });

  it('should return the customer when found', async () => {
    const customerId = 'b0af5467-b654-40cd-8f70-744c4fc1ae81';

    const customer = {
      id: customerId,
      name: 'John Doe',
      toValue() {
        return { ...this };
      },
    };

    const findCustomerByIdDto: FindCustomerByIdDto = { id: customerId };

    mockCustomerRepository.findById.mockResolvedValue(customer);

    const result = await useCase.execute(findCustomerByIdDto);

    expect(result).toEqual({ customer });
    expect(mockCustomerRepository.findById).toHaveBeenCalledWith(customerId);
  });

  it('should throw CustomerNotFoundException when customer is not found', async () => {
    const customerId = 'b0af5467-b654-40cd-8f70-744c4fc1ae81';

    const findCustomerByIdDto: FindCustomerByIdDto = { id: customerId };

    mockCustomerRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(findCustomerByIdDto)).rejects.toThrow(
      CustomerNotFoundException,
    );
    expect(mockCustomerRepository.findById).toHaveBeenCalledWith(customerId);
  });
});
