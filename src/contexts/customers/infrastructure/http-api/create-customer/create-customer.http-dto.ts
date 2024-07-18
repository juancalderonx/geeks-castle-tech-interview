import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerHttpDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsDateString()
  birthdate!: Date;
}
