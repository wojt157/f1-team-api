import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { StaffMemberService } from './staff-member.service';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { UpdateStaffMemberDto } from './dto/update-staff-member.dto';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { StaffRole } from '@prisma/client';

@ApiBearerAuth()
@Controller('staff-member')
export class StaffMemberController {
  constructor(private readonly staffMemberService: StaffMemberService) {}


  @ApiQuery({ name: 'role', enum: StaffRole, required: false, description: 'Filtruj po roli pracownika' })
  @ApiQuery({ name: 'minSalary', type: Number, required: false, description: 'Minimalna pensja' })
  @Get()
  findAll(
    @Query('role') role?: StaffRole,
    @Query('minSalary') minSalary?: string, 
  ) {
    return this.staffMemberService.findAll(role, minSalary ? +minSalary : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffMemberService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() createStaffMemberDto: CreateStaffMemberDto) {
    return this.staffMemberService.create(req.user.id, createStaffMemberDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() updateStaffMemberDto: UpdateStaffMemberDto) {
    return this.staffMemberService.update(req.user.id, +id, updateStaffMemberDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.staffMemberService.remove(req.user.id, +id);
  }
}