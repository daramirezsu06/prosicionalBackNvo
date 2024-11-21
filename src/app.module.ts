import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './utils/api.response';
import { JwtService } from '@nestjs/jwt';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { DiplomatModule } from './diplomat/diplomat.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { UserMembershipsModule } from './usermemberships/usermemberships.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TaskModule } from './task/task.module';
import { HubsModule } from './hubs/hubs.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'src/assets'), // Path to your assets folder
    // }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    AuthModule,
    DiplomatModule,
    PaymentMethodsModule,
    UserMembershipsModule,
    IntegrationsModule,
    TaskModule,
    HubsModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ThrottlerGuard,
    },
    JwtService,
  ],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
  
 }
