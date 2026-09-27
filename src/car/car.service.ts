import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';


@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}


  findAll() {
    return this.prisma.car.findMany({ include: { team: true, staffMembers: true } });
  }

  async findOne(id: number) {
    const car = await this.prisma.car.findUnique({
      where: { id },
      include: { team: true, staffMembers: true },
    });
    
    if (!car) throw new NotFoundException('Nie znaleziono bolidu');
    return car;
  }

  async create(userId: number, createCarDto: CreateCarDto) {
    const team = await this.prisma.team.findUnique({ where: { id: createCarDto.teamId } });
    if (!team || team.userId !== userId) {
      throw new ForbiddenException('Nie możesz dodać bolidu do obcego zespołu.');
    }
    return this.prisma.car.create({ data: createCarDto });
  }

  async update(userId: number, id: number, updateCarDto: UpdateCarDto) {
    const car = await this.findOne(id);
    if (car.team.userId !== userId) {
      throw new ForbiddenException('Brak dostępu do specyfikacji tego bolidu.');
    }
    return this.prisma.car.update({ where: { id }, data: updateCarDto });
  }

  async remove(userId: number, id: number) {
    const car = await this.findOne(id);
    if (car.team.userId !== userId) {
      throw new ForbiddenException('Brak dostępu do tego bolidu.');
    }
    return this.prisma.car.delete({ where: { id } });
  }
}