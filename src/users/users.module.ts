import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsUniqueEmailConstraint } from './decorators/is-unique-email.decorator';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUniqueEmailConstraint],
})
export class UsersModule {}
