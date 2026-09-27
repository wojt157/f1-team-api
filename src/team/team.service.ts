import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createTeamDto: CreateTeamDto) {
    const existingUserTeam = await this.prisma.team.findUnique({
      where: { userId },
    });
    
    if (existingUserTeam) {
      throw new ConflictException('Ten szef zarządza już swoim zespołem.');
    }

    return this.prisma.team.create({
      data: {
        ...createTeamDto,
        userId,
      },
    });
  }

  findAll() {
    return this.prisma.team.findMany();
  }

  async findOne(id: number) {
    const team = await this.prisma.team.findUnique({
      where: { id },
      include: { cars: true, staffMembers: true }
    });
    
    if (!team) {
      throw new NotFoundException('Nie znaleziono zespołu');
    }
    return team;
  }

  async update(userId: number, id: number, updateTeamDto: UpdateTeamDto) {
    const team = await this.findOne(id);
    if (team.userId !== userId) {
      throw new ForbiddenException('Możesz edytować tylko swój zespół.');
    }
    return this.prisma.team.update({ where: { id }, data: updateTeamDto });
  }

  async remove(userId: number, id: number) {
    const team = await this.findOne(id);
    if (team.userId !== userId) {
      throw new ForbiddenException('Możesz usunąć tylko swój zespół.');
    }
    return this.prisma.team.delete({ where: { id } });
  }

  async getStats(id: number) {
    const team = await this.findOne(id);

    const salaryAggregation = await this.prisma.staffMember.aggregate({
      _sum: { salary: true },
      where: { teamId: id, isActive: true },
    });
    const totalSalaries = salaryAggregation._sum.salary || 0;

    const roleDistribution = await this.prisma.staffMember.groupBy({
      by: ['role'],
      where: { teamId: id, isActive: true },
      _count: { role: true },
    });

    const staffByRole = roleDistribution.reduce((acc, curr) => {
      acc[curr.role] = curr._count.role;
      return acc;
    }, {} as Record<string, number>);

    const carsCount = await this.prisma.car.count({
      where: { teamId: id },
    });

    return {
      teamName: team.name,
      remainingBudget: team.budget,
      totalSalariesSpent: totalSalaries,
      carsCount,
      staffByRole,
    };
  }
}