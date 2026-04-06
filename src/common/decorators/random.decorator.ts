import { SetMetadata } from '@nestjs/common';

export const RANDOM_KEY = 'random';

export const Random = () => SetMetadata(RANDOM_KEY, true);
