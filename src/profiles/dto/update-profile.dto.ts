import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
