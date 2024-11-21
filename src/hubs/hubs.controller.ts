import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { HubDto } from './dto/hub.dto';
import { CreateSubHubDto, SubHubDto, UpdateSubHubDto } from './dto/sub-hub.dto';
import { HubsService } from './service/hubs.service';
import { User } from 'src/utils/decorator/user.decorator';
import { AuthUser } from 'src/utils/auth.user';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('hubs')
export class HubsController {
  constructor(private readonly hubsService: HubsService) { }

  @Post('createSubHub')
  async createSubHubs(@Body() dto: CreateSubHubDto): Promise<SubHubDto> {
    return this.hubsService.createSubHubs(dto);
  }

  @Post('updateSubHub')
  async updateSubHub(@Body() dto: UpdateSubHubDto): Promise<SubHubDto> {
    return this.hubsService.updateSubHubs(dto);
  }


  @Get("getAllHubs")
  async getAllHubs(): Promise<HubDto[]> {
    return this.hubsService.getAllHubs();
  }

  @Get('getSubHubs')
  async getAllSubHubs(@User() user: AuthUser): Promise<SubHubDto[]> {
    return this.hubsService.getAllSubHubs(user);
  }

  @Get('getSubHubById/:id')
  async getSubHubById(@Param('id', ParseIntPipe) id: number): Promise<SubHubDto> {
    return this.hubsService.getSubHubById(id);
  }
}
