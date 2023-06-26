const bcrypt = require('bcrypt');
const userRepository = require('../../../src/repository/userRepository');
const User = require('../../../src/db/model/User');
const User_Properties = require('../../../src/db/model/User_Properties');
const User_Type = require('../../../src/db/model/User_Type');
jest.mock('bcrypt');
jest.mock('../../../src/db/model/User', () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
  }
});
jest.mock('../../../src/db/model/User_Properties', () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
  }
});
jest.mock('../../../src/db/model/User_Type', () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
  }
});

describe('userRepository', () => {
  describe('addUser', () => {
    it('should add a new user successfully', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phoneNumber: '1234567890',
        image: 'any',
      };

      const userTypeId = 1;

      const hash = 'hashedPassword';

      const expectedUserId = 1;
      User.create.mockResolvedValue({ userId: expectedUserId });

      const userId = await userRepository.addUser(newUser, hash, userTypeId);

      expect(User.create).toHaveBeenCalledWith({
        fullName: newUser.name,
        email: newUser.email,
        passwordHash: hash,
        phoneNumber: newUser.phoneNumber,
        userTypeId: userTypeId,
        initialUserTypeId: userTypeId,
        image: 'any',
      });

      expect(userId).toEqual(expectedUserId);
    });

    it('should handle errors when adding a new user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phoneNumber: '1234567890',
        image: 'any',
      };
      const hash = 'hashedPassword';
      const userTypeId = 1;
      const error = 'ERROR';

      User.create.mockRejectedValue(error);

      await expect(userRepository.addUser(newUser, hash, userTypeId)).rejects.toEqual(error);
      expect(User.create).toHaveBeenCalledWith({
        fullName: newUser.name,
        email: newUser.email,
        passwordHash: hash,
        phoneNumber: newUser.phoneNumber,
        userTypeId,
        initialUserTypeId: userTypeId,
        image: 'any',
      });
    });
  });

  describe('addProfessor', () => {
    it('should add a new professor successfully', async () => {
      const userId = 1;
      const newUser = {
        matricula: '12345678',
      };

      const expectedUserId = 1;

      User_Properties.create.mockResolvedValue({ userId: expectedUserId });

      const result = await userRepository.addProfessor(userId, newUser);

      expect(User_Properties.create).toHaveBeenCalledWith({
        userId: userId,
        regNumber: newUser.matricula,
      });

      expect(result).toEqual(expectedUserId);
    });

    it('should handle errors when adding a new professor', async () => {
      const userId = 1;
      const newUser = {
        matricula: '12345678',
      };

      const error = 'Internal Server Error';

      User_Properties.create.mockRejectedValue(error);

      await expect(userRepository.addProfessor(userId, newUser)).rejects.toEqual(error);

      expect(User_Properties.create).toHaveBeenCalledWith({
        userId: userId,
        regNumber: newUser.matricula,
      });
    });
  });

  describe('addStudent', () => {
    it('should add a new student successfully', async () => {
      const userId = 1;
      const newUser = {
        matricula: '12345678',
      };

      const expectedUserId = 1;

      User_Properties.create.mockResolvedValue({ userId: expectedUserId });
      const result = await userRepository.addStudent(userId, newUser);

      expect(User_Properties.create).toHaveBeenCalledWith({
        userId: userId,
        regNumber: newUser.matricula,
        softSkills: ' ',
      });

      expect(result).toEqual(expectedUserId);
    });

    it('should handle errors when adding a new student', async () => {
      const userId = 1;
      const newUser = {
        matricula: '12345678',
      };

      const error = 'Internal Server Error';

      User_Properties.create.mockRejectedValue(error);

      await expect(userRepository.addStudent(userId, newUser)).rejects.toEqual(error);

      expect(User_Properties.create).toHaveBeenCalledWith({
        userId: userId,
        regNumber: newUser.matricula,
        softSkills: ' ',
      });
    });
  });

  describe('addJuridicalAgent', () => {
    it('should add a new juridical agent successfully', async () => {
      const userId = 1;
      const newUser = {
        cnpj: '12345678901234',
        companyName: 'Example Company',
        socialReason: 'Example Social Reason',
      };

      const expectedUserId = 1;

      User_Properties.create.mockResolvedValue({ userId: expectedUserId });

      const result = await userRepository.addJuridicalAgent(userId, newUser);

      expect(User_Properties.create).toHaveBeenCalledWith({
        userId: userId,
        cnpj: newUser.cnpj,
        companyName: newUser.companyName,
        socialReason: newUser.socialReason,
      });

      expect(result).toEqual(expectedUserId);
    });

    it('should handle errors when adding a new juridical agent', async () => {
      const userId = 1;
      const newUser = {
        cnpj: '12345678901234',
        companyName: 'Example Company',
        socialReason: 'Example Social Reason',
      };

      const error = 'Internal Server Error';

      User_Properties.create.mockRejectedValue(error);

      await expect(userRepository.addJuridicalAgent(userId, newUser)).rejects.toEqual(error);

      expect(User_Properties.create).toHaveBeenCalledWith({
        userId: userId,
        cnpj: newUser.cnpj,
        companyName: newUser.companyName,
        socialReason: newUser.socialReason,
      });
    });
  });

  describe('addPhysicalAgent', () => {
    it('should add a new physical agent successfully', async () => {
      const userId = 1;
      const newUser = {
        cpf: '12345678901',
      };

      const expectedUserId = 1;

      User_Properties.create.mockResolvedValue({ userId: expectedUserId });

      const result = await userRepository.addPhysicalAgent(userId, newUser);

      expect(User_Properties.create).toHaveBeenCalledWith({
        userId: userId,
        cpf: newUser.cpf,
      });

      expect(result).toEqual(expectedUserId);
    });

    it('should handle errors when adding a new physical agent', async () => {
      const userId = 1;
      const newUser = {
        cpf: '12345678901',
      };

      const error = 'Internal Server Error';

      User_Properties.create.mockRejectedValue(error);

      await expect(userRepository.addPhysicalAgent(userId, newUser)).rejects.toEqual(error);

      expect(User_Properties.create).toHaveBeenCalledWith({
        userId: userId,
        cpf: newUser.cpf,
      });
    });
  });

  describe('checkUser', () => {
    it('should return the user ID if the login credentials are correct', async () => {
      const loginUser = {
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const hash = 'hashedPassword';

      const user = {
        userId: 1,
        passwordHash: hash,
      };

      bcrypt.compare.mockResolvedValue(true);
      User.findOne.mockResolvedValue(user);

      const result = await userRepository.checkUser(loginUser);

      expect(bcrypt.compare).toHaveBeenCalledWith(loginUser.password, user.passwordHash);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: loginUser.email } });

      expect(result).toEqual(user.userId);
    });

    it('should reject with null if the login credentials are incorrect', async () => {
      const loginUser = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const user = {
        userId: 1,
        passwordHash: 'hashedPassword',
      };

      bcrypt.compare.mockResolvedValue(false);
      User.findOne.mockResolvedValue(user);

      await expect(userRepository.checkUser(loginUser)).rejects.toBeNull();

      expect(bcrypt.compare).toHaveBeenCalledWith(loginUser.password, user.passwordHash);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: loginUser.email } });
    });

    it('should handle errors when checking the user', async () => {
      const loginUser = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const error = 'Internal Server Error';

      User.findOne.mockRejectedValue(error);

      await expect(userRepository.checkUser(loginUser)).rejects.toEqual(error);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: loginUser.email } });
    });
  });

  describe('getUserData', () => {
    it('should return the user data for a specific user ID', async () => {
      const userId = 1;

      const userData = {
        userId: 1,
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        isAdmin: false,
        userTypeId: 2,
      };

      const professorResult = {
        userId: 1,
      };

      const expectedType = 'Professor';

      User.findOne.mockResolvedValue(userData);
      User_Type.findOne.mockResolvedValue(professorResult);

      const result = await userRepository.getUserData(userId);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userId: userId } });
      expect(User_Type.findOne).toHaveBeenCalledWith({where: { userTypeId: userData.userTypeId }});

      expect(result.userId).toEqual(userData.userId);
      expect(result.fullName).toEqual(userData.fullName);
      expect(result.email).toEqual(userData.email);
    });

    it('should return the user data for a specific user ID (student)', async () => {
      const userId = 1;

      const userData = {
        userId: 1,
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        isAdmin: false,
        userTypeId: 1,
      };

      const studentResult = {
        userId: 1,
      };

      const expectedType = 'Aluno';

      User.findOne.mockResolvedValue(userData);
      User_Type.findOne.mockResolvedValue(studentResult);

      const result = await userRepository.getUserData(userId);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userId: userId } });
      expect(User_Type.findOne).toHaveBeenCalledWith({where: { userTypeId: userData.userTypeId }});

      expect(result.userId).toEqual(userData.userId);
      expect(result.fullName).toEqual(userData.fullName);
      expect(result.email).toEqual(userData.email);
    });

    it('should return the user data for a specific user ID (physical agent)', async () => {
      const userId = 1;

      const userData = {
        userId: 1,
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        isAdmin: false,
        userTypeId: 3,
      };

      const physicalAgentResult = {
        userId: 1,
      };

      const expectedType = 'Agente Externo';

      User.findOne.mockResolvedValue(userData);
      User_Type.findOne.mockResolvedValue(physicalAgentResult);

      const result = await userRepository.getUserData(userId);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userId: userId } });
      expect(User_Type.findOne).toHaveBeenCalledWith({where: { userTypeId: userData.userTypeId }});

      expect(result.userId).toEqual(userData.userId);
      expect(result.fullName).toEqual(userData.fullName);
      expect(result.email).toEqual(userData.email);
    });

    it('should return the user data for a specific user ID (juridical agent)', async () => {
      const userId = 1;

      const userData = {
        userId: 1,
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        isAdmin: false,
        userTypeId: 4,
      };

      const juridicalAgentResult = {
        userId: 1,
      };

      const expectedType = 'Agente Externo';

      User.findOne.mockResolvedValue(userData);
      User_Type.findOne.mockResolvedValue(juridicalAgentResult);

      const result = await userRepository.getUserData(userId);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userId: userId } });
      expect(User_Type.findOne).toHaveBeenCalledWith({where: { userTypeId: userData.userTypeId }});

      expect(result.userId).toEqual(userData.userId);
      expect(result.fullName).toEqual(userData.fullName);
      expect(result.email).toEqual(userData.email);
    });

    it('should handle errors when getting user data', async () => {
      const userId = 1;

      const error = 'Internal Server Error';

      User.findOne.mockRejectedValue(error);

      await expect(userRepository.getUserData(userId)).rejects.toEqual(error);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userId: userId } });
    });
  });

  describe('updateUserPassword', () => {
    it('should update the user password successfully', async () => {
      const email = 'john.doe@example.com';
      const hash = 'newHashedPassword';

      const expectedResponse = {};

      User.update.mockResolvedValue(expectedResponse);

      const result = await userRepository.updateUserPassword(email, hash);

      expect(User.update).toHaveBeenCalledWith(
        { passwordHash: hash },
        { where: { email: email } }
      );

      expect(result).toBeUndefined();
    });

    it('should handle errors when updating the user password', async () => {
      const email = 'john.doe@example.com';
      const hash = 'newHashedPassword';

      const error = 'Internal Server Error';

      User.update.mockRejectedValue(error);

      await expect(userRepository.updateUserPassword(email, hash)).rejects.toEqual(error);

      expect(User.update).toHaveBeenCalledWith(
        { passwordHash: hash },
        { where: { email: email } }
      );
    });
  });

  describe('checkUserByEmail', () => {
    it('should return the user data for a specific email', async () => {
      const email = 'john.doe@example.com';

      const expectedResponse = {};

      User.findAll.mockResolvedValue(expectedResponse);

      const result = await userRepository.checkUserByEmail(email);

      expect(User.findAll).toHaveBeenCalledWith({ where: { email: email } });
      expect(result).toEqual(expectedResponse);
    });

    it('should handle errors when checking user by email', async () => {
      const email = 'john.doe@example.com';

      const error = 'Internal Server Error';

      User.findAll.mockRejectedValue(error);

      await expect(userRepository.checkUserByEmail(email)).rejects.toEqual(error);

      expect(User.findAll).toHaveBeenCalledWith({ where: { email: email } });
    });
  });

  describe('getAllUsers', () => {
    it('should return all the users', async () => {
      const expectedResponse = {};

      User.findAll.mockResolvedValue(expectedResponse);

      const result = await userRepository.getAllUsers();

      expect(User.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });

    it('should handle errors when get all users', async () => {
      const error = 'Internal Server Error';

      User.findAll.mockRejectedValue(error);

      await expect(userRepository.getAllUsers()).rejects.toEqual(error);

      expect(User.findAll).toHaveBeenCalled();
    });
  });

  describe('getUserProperties', () => {
    it('should return the user property', async () => {
      const expectedResponse = {};

      const userId = 1;

      User_Properties.findAll.mockResolvedValue(expectedResponse);

      const result = await userRepository.getUserProperties(userId);

      expect(User_Properties.findAll).toHaveBeenCalledWith({ where: { userId: userId } });
      expect(result).toEqual(expectedResponse);
    });

    it('should handle errors when get user property', async () => {
      const error = 'Internal Server Error';

      const userId = 1;

      User_Properties.findAll.mockRejectedValue(error);

      await expect(userRepository.getUserProperties(userId)).rejects.toEqual(error);

      expect(User_Properties.findAll).toHaveBeenCalledWith({ where: { userId: userId } });
    });
  });

  describe('getAllUsers', () => {
    it('should resolve with response when User.findAll resolves', async () => {
      const mockResponse = ['user1', 'user2'];
      User.findAll = jest.fn().mockResolvedValue(mockResponse);

      const result = await userRepository.getAllUsers();

      expect(User.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('should reject with error when User.findAll rejects', async () => {
      const mockError = new Error('Database error');
      User.findAll = jest.fn().mockRejectedValue(mockError);

      await expect(userRepository.getAllUsers()).rejects.toThrow(mockError);
      expect(User.findAll).toHaveBeenCalled();
    });
  });

  describe('getUserProperties', () => {
    it('should resolve with response when User_Properties.findAll resolves', async () => {
      const mockResponse = ['property1', 'property2'];
      User_Properties.findAll = jest.fn().mockResolvedValue(mockResponse);
      const userId = 1;

      const result = await userRepository.getUserProperties(userId);

      expect(User_Properties.findAll).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual(mockResponse);
    });

    it('should reject with error when User_Properties.findAll rejects', async () => {
      const mockError = new Error('Database error');
      User_Properties.findAll = jest.fn().mockRejectedValue(mockError);
      const userId = 1;

      await expect(userRepository.getUserProperties(userId)).rejects.toThrow(mockError);
      expect(User_Properties.findAll).toHaveBeenCalledWith({ where: { userId } });
    });
  });

  describe('revokeUserPermissions', () => {
    it('should resolve with response when User.findOne and User.update resolve', async () => {
      const mockFindOneResponse = {
        initialUserTypeId: 2
      };
      const mockUpdateResponse = ['updatedUser'];
      User.findOne = jest.fn().mockResolvedValue(mockFindOneResponse);
      User.update = jest.fn().mockResolvedValue(mockUpdateResponse);
      const userId = 1;

      const result = await userRepository.revokeUserPermissions(userId);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userId } });
      expect(User.update).toHaveBeenCalledWith(
        { userTypeId: mockFindOneResponse.initialUserTypeId },
        { where: { userId }, returning: true }
      );
      expect(result).toEqual(mockUpdateResponse);
    });

    it('should reject with error when User.findOne rejects', async () => {
      const mockError = new Error('Database error');
      User.findOne = jest.fn().mockRejectedValue(mockError);
      const userId = 1;

      await expect(userRepository.revokeUserPermissions(userId)).rejects.toThrow(mockError);
      expect(User.findOne).toHaveBeenCalledWith({ where: { userId } });
    });

    it('should reject with error when User.update rejects', async () => {
      const mockFindOneResponse = {
        initialUserTypeId: 2
      };
      const mockError = new Error('Database error');
      User.findOne = jest.fn().mockResolvedValue(mockFindOneResponse);
      User.update = jest.fn().mockRejectedValue(mockError);
      const userId = 1;

      await expect(userRepository.revokeUserPermissions(userId)).rejects.toThrow(mockError);
      expect(User.findOne).toHaveBeenCalledWith({ where: { userId } });
      expect(User.update).toHaveBeenCalledWith(
        { userTypeId: mockFindOneResponse.initialUserTypeId },
        { where: { userId }, returning: true }
      );
    });
  });

  describe('changeUserTypes', () => {
    it('should resolve with success message when users array is not empty', async () => {
      const mockUsers = [
        { userId: 1, userTypeId: 2 },
        { userId: 3, userTypeId: 4 }
      ];
      User.update = jest.fn().mockResolvedValue();

      const result = await userRepository.changeUserTypes(mockUsers);

      expect(User.update).toHaveBeenCalledTimes(mockUsers.length);
      expect(result).toBe('Tipos de usuário atualizados com sucesso');
    });

    it('should reject with error when users array is empty', async () => {
      const mockUsers = [];
      User.update = jest.fn();

      await expect(userRepository.changeUserTypes(mockUsers)).rejects.toThrow(
        'Array de usuários passado está vazio'
      );
      expect(User.update).not.toHaveBeenCalled();
    });
  });
});

