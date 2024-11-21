import { SetMetadata } from '@nestjs/common';

export const UserTypes = (...userTypes: number[]) => SetMetadata('userTypes', userTypes);
