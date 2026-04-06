import { Length } from 'class-validator';
import { IsNotEmptyString } from 'src/common/decorators/is-not-empty-string.decorator';

export class CreateProfileDto {
  @IsNotEmptyString()
  @Length(3, 100)
  name: string;

  @IsNotEmptyString()
  description: string;
}
