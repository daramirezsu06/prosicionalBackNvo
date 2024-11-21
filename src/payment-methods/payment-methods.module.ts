import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './payment-methods.controller';
import { PaymentMethodsService } from './payment-methods.service';
import { SharedModule } from 'src/shared/shared.module';
import { EncryptionService } from './encryption/encryption.service';

@Module({
  imports:[SharedModule],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService,EncryptionService]
})
export class PaymentMethodsModule {}
