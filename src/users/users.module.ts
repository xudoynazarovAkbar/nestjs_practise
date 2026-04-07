import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsUniqueEmailConstraint } from './decorators/is-unique-email.decorator';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, IsUniqueEmailConstraint],
})
export class UsersModule {}
