import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import TestUtils from '../common/test/TestUtils';

describe('UserService', () => {
  let service: UserService;
  let validUser: User = TestUtils.giveAnUser();

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should be list all users', async () => {
      mockRepository.find.mockReturnValue([validUser, validUser]);

      const users = await service.findAllUsers();

      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    })
  })

  describe('findUserById', () => {
    it('should be find an existing user', async () => {
      mockRepository.findOne.mockReturnValue(validUser);

      const userFound = await service.findUserById('1');

      expect(userFound).toMatchObject(validUser);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    })
  })
});
