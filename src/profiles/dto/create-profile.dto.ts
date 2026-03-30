import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
