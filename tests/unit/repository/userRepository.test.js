const bcrypt = require('bcrypt');
const userRepository = require('../../../src/repository/userRepository');
const User = require('../../../src/db/model/User');
const Juridical_Agent = require('../../../src/db/model/Juridical_Agent');
const Physical_Agent = require('../../../src/db/model/Physical_Agent');
const Student = require('../../../src/db/model/Student');
const Teacher = require('../../../src/db/model/Teacher');

jest.mock('bcrypt');
jest.mock('../../../src/db/model/User');
jest.mock('../../../src/db/model/Juridical_Agent');
jest.mock('../../../src/db/model/Physical_Agent');
jest.mock('../../../src/db/model/Student');
jest.mock('../../../src/db/model/Teacher');

describe('userRepository', () => {
  describe('addUser', () => {
    it('should add a new user successfully', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phoneNumber: '1234567890',
      };
      const hash = 'hashedPassword';

      const expectedUserId = 1;
      User.create.mockResolvedValue({ userId: expectedUserId });

      const userId = await userRepository.addUser(newUser, hash);

      expect(User.create).toHaveBeenCalledWith({
        fullName: newUser.name,
        email: newUser.email,
        passwordHash: hash,
        isAdmin: false,
        phoneNumber: newUser.phoneNumber,
      });

      expect(userId).toEqual(expectedUserId);
    });

    it('should handle errors when adding a new user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phoneNumber: '1234567890',
      };
      const hash = 'hashedPassword';
      const error = 'ERROR';

      User.create.mockRejectedValue(error);

      await expect(userRepository.addUser(newUser, hash)).rejects.toEqual(error);
      expect(User.create).toHaveBeenCalledWith({
        fullName: newUser.name,
        email: newUser.email,
        passwordHash: hash,
        isAdmin: false,
        phoneNumber: newUser.phoneNumber,
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

      Teacher.create.mockResolvedValue({ userId: expectedUserId });

      const result = await userRepository.addProfessor(userId, newUser);

      expect(Teacher.create).toHaveBeenCalledWith({
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

      Teacher.create.mockRejectedValue(error);

      await expect(userRepository.addProfessor(userId, newUser)).rejects.toEqual(error);

      expect(Teacher.create).toHaveBeenCalledWith({
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

      Student.create.mockResolvedValue({ userId: expectedUserId });
      const result = await userRepository.addStudent(userId, newUser);

      expect(Student.create).toHaveBeenCalledWith({
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

      Student.create.mockRejectedValue(error);

      await expect(userRepository.addStudent(userId, newUser)).rejects.toEqual(error);

      expect(Student.create).toHaveBeenCalledWith({
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

      Juridical_Agent.create.mockResolvedValue({ userId: expectedUserId });

      const result = await userRepository.addJuridicalAgent(userId, newUser);

      expect(Juridical_Agent.create).toHaveBeenCalledWith({
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

      Juridical_Agent.create.mockRejectedValue(error);

      await expect(userRepository.addJuridicalAgent(userId, newUser)).rejects.toEqual(error);

      expect(Juridical_Agent.create).toHaveBeenCalledWith({
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

      Physical_Agent.create.mockResolvedValue({ userId: expectedUserId });

      const result = await userRepository.addPhysicalAgent(userId, newUser);

      expect(Physical_Agent.create).toHaveBeenCalledWith({
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

      Physical_Agent.create.mockRejectedValue(error);

      await expect(userRepository.addPhysicalAgent(userId, newUser)).rejects.toEqual(error);

      expect(Physical_Agent.create).toHaveBeenCalledWith({
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
      };

      const professorResult = {
        userId: 1,
      };

      const expectedType = 'Professor';

      User.findOne.mockResolvedValue(userData);
      Teacher.findOne.mockResolvedValue(professorResult);

      const result = await userRepository.getUserData(userId);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userId: userId } });
      expect(Teacher.findOne).toHaveBeenCalledWith({ where: { userId: userId } });

      expect(result.userId).toEqual(userData.userId);
      expect(result.fullName).toEqual(userData.fullName);
      expect(result.email).toEqual(userData.email);
      expect(result.isAdmin).toEqual(userData.isAdmin);
      expect(result.type).toEqual(expectedType);
    });

    it('should return the user data for a specific user ID (student)', async () => {
      const userId = 1;

      const userData = {
        userId: 1,
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        isAdmin: false,
      };

      const studentResult = {
        userId: 1,
      };

      const expectedType = 'Aluno';

      User.findOne.mockResolvedValue(userData);
      Student.findOne.mockResolvedValue(studentResult);

      const result = await userRepository.getUserData(userId);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userId: userId } });
      expect(Student.findOne).toHaveBeenCalledWith({ where: { userId: userId } });

      expect(result.userId).toEqual(userData.userId);
      expect(result.fullName).toEqual(userData.fullName);
      expect(result.email).toEqual(userData.email);
      expect(result.isAdmin).toEqual(userData.isAdmin);
      expect(result.type).toEqual(expectedType);
    });

    it('should return the user data for a specific user ID (physical agent)', async () => {
      const userId = 1;

      const userData = {
        userId: 1,
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        isAdmin: false,
      };

      const physicalAgentResult = {
        userId: 1,
      };

      const expectedType = 'Agente Externo';

      User.findOne.mockResolvedValue(userData);
      Physical_Agent.findOne.mockResolvedValue(physicalAgentResult);

      const result = await userRepository.getUserData(userId);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userId: userId } });
      expect(Physical_Agent.findOne).toHaveBeenCalledWith({ where: { userId: userId } });

      expect(result.userId).toEqual(userData.userId);
      expect(result.fullName).toEqual(userData.fullName);
      expect(result.email).toEqual(userData.email);
      expect(result.isAdmin).toEqual(userData.isAdmin);
      expect(result.type).toEqual(expectedType);
    });

    it('should return the user data for a specific user ID (juridical agent)', async () => {
      const userId = 1;

      const userData = {
        userId: 1,
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        isAdmin: false,
      };

      const juridicalAgentResult = {
        userId: 1,
      };

      const expectedType = 'Agente Externo';

      User.findOne.mockResolvedValue(userData);
      Juridical_Agent.findOne.mockResolvedValue(juridicalAgentResult);

      const result = await userRepository.getUserData(userId);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userId: userId } });
      expect(Juridical_Agent.findOne).toHaveBeenCalledWith({ where: { userId: userId } });

      expect(result.userId).toEqual(userData.userId);
      expect(result.fullName).toEqual(userData.fullName);
      expect(result.email).toEqual(userData.email);
      expect(result.isAdmin).toEqual(userData.isAdmin);
      expect(result.type).toEqual(expectedType);
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
});

