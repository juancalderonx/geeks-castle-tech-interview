import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateUserHttpDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 25)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?!.*[\n])(?!.*\s)(?=.*[\d\W]).{8,12}$/, {
    message:
      'The password must be 8 to 25 characters long and contain at least one uppercase letter, one lowercase letter and one special character or number. No line breaks or blank spaces are allowed.',
  })
  password!: string;
}
