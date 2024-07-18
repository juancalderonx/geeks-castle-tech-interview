import { Test, TestingModule } from '@nestjs/testing';
import {
  UpdateCustomerUseCase,
  UpdateCustomerDto,
} from '../application/use-cases/update-customer-use-case';
import { CustomerRepository } from '../domain';
import { CustomerNotFoundException } from '../domain';

describe('UpdateCustomerUseCase', () => {
  let useCase: UpdateCustomerUseCase;
  let mockCustomerRepository: any;

  beforeEach(async () => {
    mockCustomerRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCustomerUseCase,
        {
          provide: CustomerRepository,
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateCustomerUseCase>(UpdateCustomerUseCase);
  });

  it('should update an existing customer', async () => {
    const customerId = 'b0af5467-b654-40cd-8f70-744c4fc1ae81';

    const updateCustomerDto: UpdateCustomerDto = {
      name: 'Juan',
      lastName: 'Esteban',
      birthdate: new Date('1990-01-01'),
    };

    const existingCustomer = {
      id: customerId,
      name: 'John',
      lastName: 'Doe',
      birthdate: new Date('1980-01-01'),
      toValue() {
        return { ...this };
      },
    };

    const updatedCustomer = {
      ...existingCustomer,
      ...updateCustomerDto,
      toValue() {
        return { ...this };
      },
    };

    mockCustomerRepository.findById.mockResolvedValue(existingCustomer);
    mockCustomerRepository.update.mockResolvedValue(updatedCustomer);

    await useCase.execute(customerId, updateCustomerDto);

    expect(mockCustomerRepository.findById).toHaveBeenCalledWith(customerId);
  });

  it('should throw CustomerNotFoundException when customer is not found', async () => {
    const customerId = 'b0af5467-b654-40cd-8f70-744c4fc1ae81';

    const updateCustomerDto: UpdateCustomerDto = {
      name: 'Juan',
      lastName: 'Esteban',
      birthdate: new Date('1990-01-01'),
    };

    mockCustomerRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute(customerId, updateCustomerDto),
    ).rejects.toThrow(CustomerNotFoundException);

    expect(mockCustomerRepository.findById).toHaveBeenCalledWith(customerId);
  });
});
