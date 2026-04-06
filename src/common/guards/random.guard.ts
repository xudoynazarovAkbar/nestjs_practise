// guards/random.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RANDOM_KEY } from '../decorators/random.decorator';

@Injectable()
export class RandomGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isRandom = this.reflector.getAllAndOverride<boolean>(RANDOM_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isRandom) return true;

    const passes = Math.random() < 0.5;

    if (!passes) throw new ForbiddenException('You were unlucky. Try again.');

    return true;
  }
}
