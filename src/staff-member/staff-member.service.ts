import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { UpdateStaffMemberDto } from './dto/update-staff-member.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { StaffRole } from '@prisma/client';

@Injectable()
export class StaffMemberService {
  constructor(private prisma: PrismaService) {}

  findAll(role?: StaffRole, minSalary?: number) {
    const whereClause: any = { isActive: true };

    if (role) {
      whereClause.role = role; 
    }
    if (minSalary) {
      whereClause.salary = { gte: minSalary }; 
    }

    return this.prisma.staffMember.findMany({
      where: whereClause,
      include: { team: true, car: true }
    });
  }

  async findOne(id: number) {
    const staff = await this.prisma.staffMember.findFirst({
      where: { id, isActive: true },
      include: { team: true, car: true },
    });
    
    if (!staff) throw new NotFoundException('Nie znaleziono pracownika (lub został zwolniony)');
    return staff;
  }

  async create(userId: number, createStaffMemberDto: CreateStaffMemberDto) {
    const team = await this.prisma.team.findUnique({ 
      where: { id: createStaffMemberDto.teamId } 
    });
    
    if (!team || team.userId !== userId) {
      throw new ForbiddenException('Nie możesz zatrudniać personelu dla obcego zespołu.');
    }

    if (team.budget < createStaffMemberDto.salary) {
      const missingFunds = createStaffMemberDto.salary - team.budget;
      throw new BadRequestException(
        `Przekroczono limit budżetowy! Brakuje Ci ${missingFunds} do zatrudnienia tego pracownika.`
      );
    }
    
    return this.prisma.$transaction(async (tx) => {
      const newStaff = await tx.staffMember.create({ 
        data: createStaffMemberDto 
      });

      await tx.team.update({
        where: { id: team.id },
        data: { budget: team.budget - createStaffMemberDto.salary },
      });

      return newStaff;
    });
  }

  async update(userId: number, id: number, updateStaffMemberDto: UpdateStaffMemberDto) {
    const staff = await this.findOne(id);
    if (staff.team.userId !== userId) {
      throw new ForbiddenException('Brak dostępu do edycji akt tego pracownika.');
    }
    return this.prisma.staffMember.update({ 
      where: { id }, 
      data: updateStaffMemberDto 
    });
  }

  async remove(userId: number, id: number) {
    const staff = await this.findOne(id);
    
    if (staff.team.userId !== userId) {
      throw new ForbiddenException('Brak dostępu do zwolnienia tego pracownika.');
    }
    
    return this.prisma.staffMember.update({ 
      where: { id },
      data: { isActive: false }
    });
  }
}
