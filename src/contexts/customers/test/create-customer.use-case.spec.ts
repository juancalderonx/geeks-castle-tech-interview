import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateCustomerUseCase,
  CreateCustomerDto,
} from '../application/use-cases/create-customer-use-case';
import { Customer, CustomerRepository } from '../domain';

describe('CreateCustomerUseCase', () => {
  let useCase: CreateCustomerUseCase;
  let mockCustomerRepository: any;

  beforeEach(async () => {
    mockCustomerRepository = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCustomerUseCase,
        {
          provide: CustomerRepository,
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateCustomerUseCase>(CreateCustomerUseCase);

    jest.spyOn(Customer, 'create').mockImplementation(
      (customerDto) =>
        ({
          ...customerDto,
          id: 'b0af5467-b654-40cd-8f70-744c4fc1ae81',
          toValue() {
            return { ...this };
          },
        }) as any,
    );
  });

  it('should create a new customer', async () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'Juan',
      lastName: 'Esteban',
      birthdate: new Date('1990-01-01'),
    };

    const expectedCustomer = {
      id: 'b0af5467-b654-40cd-8f70-744c4fc1ae81',
      name: 'Juan',
      lastName: 'Esteban',
      birthdate: new Date('1990-01-01'),
      age: 0,
    };

    mockCustomerRepository.save.mockImplementation((customer) => {
      return customer;
    });

    await useCase.execute(createCustomerDto);

    const savedCustomer = mockCustomerRepository.save.mock.calls[0][0];

    const sanitize = (obj) => {
      delete obj.toValue;
      return obj;
    };

    expect(sanitize(savedCustomer)).toEqual(sanitize(expectedCustomer));
  });

  it('should throw an error if birthdate is not provided', async () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'Juan',
      lastName: 'Esteban',
      birthdate: undefined,
    };

    await expect(useCase.execute(createCustomerDto)).rejects.toThrow(
      'Date of birth is required',
    );
  });
});
