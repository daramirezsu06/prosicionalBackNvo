import { Module } from '@nestjs/common';
import { HubsController } from './hubs.controller';
import { HubsService } from './service/hubs.service';

@Module({
  controllers: [HubsController],
  providers: [HubsService]
})
export class HubsModule {}
