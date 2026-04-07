import { IsEmail, IsString, IsIn, MinLength, Matches } from 'class-validator';
import { IsUniqueEmail } from '../decorators/is-unique-email.decorator';
import { ADMIN, USER } from '../constants/roles';
import { type Roles } from '../interfaces/user.interface';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  @IsUniqueEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must contain uppercase, lowercase and number',
  })
  password: string;

  @IsString()
  @IsIn([USER, ADMIN], {
    message: `Role must be either '${USER}' or '${ADMIN}'`,
  })
  role: Roles;
}
