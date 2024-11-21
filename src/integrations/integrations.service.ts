import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the import path as needed
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';

@Injectable()
export class IntegrationsService {
    constructor(private readonly prisma: PrismaService) { }

    async connectApp(userId: number, createIntegrationDto: CreateIntegrationDto) {
        const { appName, description, accessToken, tokenExpiresAt, refreshToken } = createIntegrationDto;

        if (await this.isAppConnected(userId, appName)) {
            throw new HttpException("App already connected", HttpStatus.CONFLICT);
        }

        const integration = await this.prisma.integrations.create({
            data: {
                userId,
                appName,
                description,
                isConnected: true,
                createdAt: new Date(),
                accessToken,
                refreshToken,
                tokenExpiresAt,
            },
        });
        return await this.prisma.integrations.findUnique({
            where: { id: integration.id },
            select: {
                id: true,
                appName: true, description: true,
                isConnected: true, createdAt: true,
                accessToken: true, refreshToken: true,
                tokenExpiresAt: true
            },
        });
    }

    async isAppConnected(userId: number, appName: string): Promise<boolean> {
        const integration = await this.prisma.integrations.findFirst({
            where: {
                userId,
                appName,
                isActive: true,
            },
        });
        return !!integration; // Returns true if an integration is found
    }

    async updateTokens(userId: number, id: number, updateIntegrationDto: UpdateIntegrationDto) {
        try {

            await this.prisma.integrations.update({
                where: { id, userId },
                data: {
                    accessToken: updateIntegrationDto.accessToken,
                    refreshToken: updateIntegrationDto.refreshToken,
                    tokenExpiresAt: updateIntegrationDto.tokenExpiresAt,
                    updatedAt: new Date(),
                },
            });
            return await this.prisma.integrations.findUnique({
                where: { id },
                select: {
                    id: true,
                    appName: true, description: true,
                    isConnected: true, createdAt: true,
                    accessToken: true, refreshToken: true,
                    tokenExpiresAt: true
                },
            });
        } catch (error) {
            throw new HttpException("An error occurred while processing your request", HttpStatus.BAD_REQUEST);
        }
    }

    async listIntegrations(userId: number) {
        return await this.prisma.integrations.findMany({
            where: { userId },
        });
    }

    async disconnectApp(userId: number, id: number) {

        try {

            await this.prisma.integrations.update({
                where: { id, userId },
                data: { isConnected: false, updatedAt: new Date() },
            });

            return await this.prisma.integrations.findUnique({
                where: { id },
                select: {
                    id: true,
                    appName: true, description: true,
                    isConnected: true, createdAt: true,
                    accessToken: true, refreshToken: true,
                    tokenExpiresAt: true
                },
            });

        } catch (error) {
            throw new HttpException("An error occurred while processing your request", HttpStatus.BAD_REQUEST);
        }
    }

    async getIntegrationById(userId: number, id: string) {
        return await this.prisma.integrations.findUnique({
            where: { id: parseInt(id), userId: userId },
            select: {
                id: true,
                appName: true, description: true,
                isConnected: true, createdAt: true,
                accessToken: true, refreshToken: true,
                tokenExpiresAt: true
            },
        });
    }
}
