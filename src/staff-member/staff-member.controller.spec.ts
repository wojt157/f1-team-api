import { Test, TestingModule } from '@nestjs/testing';
import { StaffMemberController } from './staff-member.controller';
import { StaffMemberService } from './staff-member.service';

describe('StaffMemberController', () => {
  let controller: StaffMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffMemberController],
      providers: [StaffMemberService],
    }).compile();

    controller = module.get<StaffMemberController>(StaffMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
