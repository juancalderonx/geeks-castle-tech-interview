import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindUserByIdHttpDto {
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}
