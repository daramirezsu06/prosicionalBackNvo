import { Controller, Post, Get, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { User } from 'src/utils/decorator/user.decorator';
import { AuthUser } from 'src/utils/auth.user';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateIntegrationDto } from './dto/update-integration.dto';

@UseGuards(JwtAuthGuard)
@Controller('integrations')
export class IntegrationsController {
    constructor(private readonly integrationsService: IntegrationsService) { }

    @Post('connect')
    async connectApp(
        @User() user: AuthUser,
        @Body() createIntegrationDto: CreateIntegrationDto
    ) {
        return this.integrationsService.connectApp(user.userId, createIntegrationDto);
    }

    @Put('update/:id')
    async updateTokens(
        @User() user: AuthUser,
        @Param('id') id: string,
        @Body() updateIntegrationDto: UpdateIntegrationDto) {
        return await this.integrationsService.updateTokens(user.userId, parseInt(id), updateIntegrationDto);
    }

    @Get("getAll")
    async listIntegrations(
        @User() user: AuthUser
    ) {
        return await this.integrationsService.listIntegrations(user.userId);
    }

    @Put('disconnect/:id')
    async disconnectApp(
        @User() user: AuthUser,
        @Param('id') id: string,
    ) {
        return await this.integrationsService.disconnectApp(user.userId, parseInt(id));
    }

    @Get('getById/:id')
    async getIntegrationById(
        @User() user: AuthUser,
        @Param('id') id: string) {
        return await this.integrationsService.getIntegrationById(user.userId, id);
    }
}
