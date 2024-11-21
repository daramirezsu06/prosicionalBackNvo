import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from './dto/create.payment.method.dto';
import { UpdatePaymentMethodDto } from './dto/update.payment.method.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { AuthUser } from 'src/utils/auth.user';
import { CustomMessage } from 'src/utils/decorator/custom-message.decorator';

@UseGuards(JwtAuthGuard)
@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) { }

  @Post("create")
  create(
    @User() user: AuthUser,
    @Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodsService.create(user.userId, createPaymentMethodDto);
  }

  @Get("getAll")
  getAll(
    @User() user: AuthUser,
  ) {
    return this.paymentMethodsService.findAll(user.userId);
  }

  @Get('getById/:id')
  findOne(
    @User() user: AuthUser,
    @Param('id') id: string) {
    return this.paymentMethodsService.findOne(user.userId, parseInt(id));
  }

  @Put('update/:id')
  update(
    @User() user: AuthUser,
    @Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodsService.update(user.userId, parseInt(id), updatePaymentMethodDto);
  }

  @CustomMessage('Payment method deleted successfully')
  @Delete('delete/:id')
  delete(
    @User() user: AuthUser,
    @Param('id') id: string) {
    return this.paymentMethodsService.delete(user.userId, id);
  }
}
