import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HubDto } from '../dto/hub.dto';
import { CreateSubHubDto, SubHubDto, UpdateSubHubDto } from '../dto/sub-hub.dto';
import { Prisma } from '@prisma/client';
import { AuthUser } from 'src/utils/auth.user';


@Injectable()
export class HubsService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async getAllHubs(): Promise<HubDto[]> {
    const hubs = await this.prisma.hub.findMany();
    return hubs.map(hub => ({ ...hub })); // Map to HubDto if necessary
  }

  async createSubHubs(dto: CreateSubHubDto) {
    const subHubs = await this.prisma.subHub.create({
      data: {
        name: dto.name,
        description: dto.description,
        tags: dto.tags,
        overview: dto.overview,
        detail: dto.detail,
        isActive: true,
        hubs: { connect: { id: dto.hubId } },
        principalContent: dto.principalContent,
        rightContend: dto.rightContend,
        country: { connect: { id: dto.countryId } },
      },
    });
    return subHubs;
  }

  async updateSubHubs(dto: UpdateSubHubDto) {
    const subHubs = await this.prisma.subHub.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        description: dto.description,
        tags: dto.tags,
        overview: dto.overview,
        detail: dto.detail,
        principalContent: dto.principalContent,
        rightContend: dto.rightContend,
      },
    });
    return subHubs;
  }

  async getAllSubHubs(user: AuthUser): Promise<SubHubDto[]> {
    const subHubs = await this.prisma.subHub.findMany({ where: { isActive: true, countryId: user.assignedCountryId } });
    return subHubs;
  }

  async getSubHubById(id: number): Promise<SubHubDto> {
    const subHub = await this.prisma.subHub.findUnique({ where: { id } });
    if (!subHub) {
      throw new Error('SubHub not found'); // Handle error appropriately
    }
    return { ...subHub }; // Map to SubHubDto if necessary
  }
}
