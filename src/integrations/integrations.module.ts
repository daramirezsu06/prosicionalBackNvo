import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the import path as needed
import { IntegrationsService } from './integrations.service';
import { IntegrationsController } from './integrations.controller';

@Module({
  imports: [],
  controllers: [IntegrationsController],
  providers: [IntegrationsService, PrismaService],
})
export class IntegrationsModule {}

