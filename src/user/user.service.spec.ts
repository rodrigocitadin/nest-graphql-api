import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import TestUtils from '../common/test/TestUtils';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

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

  beforeAll(async () => {
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

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  })

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

    it('should return an exception when does not find an user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      await service.findUserById('1').catch(e => {
        expect(e).toBeInstanceOf(NotFoundException);
      })
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    })
  })

  describe('createUser', () => {
    it('should create an user', async () => {
      mockRepository.save.mockReturnValue(validUser);
      mockRepository.create.mockReturnValue(validUser);

      expect(await service.createUser(validUser)).toMatchObject(validUser);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    })

    it('should return an exception when doesnt create an user', async () => {
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(validUser);

      await service.createUser(validUser).catch(e => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      })
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    })
  })

  describe('updateUser', () => {
    it('should update an user', async () => {
      const updatedUser = { ...validUser, name: 'new name' };

      mockRepository.findOne.mockReturnValue(validUser);
      mockRepository.update.mockReturnValue(updatedUser);
      mockRepository.create.mockReturnValue(updatedUser);

      expect(await service.updateUser('1', {
        ...validUser,
        name: 'new name',
      })).toMatchObject(updatedUser);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.update).toBeCalledTimes(1);
      expect(mockRepository.create).toBeCalledTimes(1);
    })
  })

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      mockRepository.findOne.mockReturnValue(validUser);
      mockRepository.delete.mockReturnValue(validUser);

      expect(await service.deleteUser('1')).toBe(true);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    })

    it('should not delete an inexisting user', async () => {
      mockRepository.findOne.mockReturnValue(validUser);
      mockRepository.delete.mockReturnValue(null);

      expect(await service.deleteUser('1')).toBe(false);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    })
  })
});
