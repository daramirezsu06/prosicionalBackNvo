import { Global, Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../payment-methods/encryption/encryption.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()
@Module({
    providers: [EmailService, PrismaService],
    exports: [EmailService, PrismaService],
    imports: [],
    controllers: [],
})
export class SharedModule { }
