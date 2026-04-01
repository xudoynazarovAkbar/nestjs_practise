import { IsEmail, IsString, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../decorators/is-unique-email.decorator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  @IsUniqueEmail()
  email: string;
}
