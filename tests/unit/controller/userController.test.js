const bcrypt = require('bcrypt');
const emailService = require('../../../src/services/emailService');
const controller = require('../../../src/controller/userController');
const userRepository = require('../../../src/repository/userRepository');
const User = require('../../../src/db/model/User');
const userTypeRepository = require('../../../src/repository/userTypeRepository');
const jwt = require('jsonwebtoken');

jest.mock('../../../src/repository/userRepository');
jest.mock('../../../src/repository/userTypeRepository');
jest.mock('../../../src/services/emailService');
jest.mock('../../../src/db/model/User');

describe('Controller', () => {
  describe('registerUser', () => {
    let newUser = {
      name: 'John',
      email: 'john@test.com',
      password: 'password',
      type: 'Agente Externo',
      externalAgentType: 'Pessoa Fisica',
    };
    let userType = {
      userTypeId: 1,
      typeName: 'Aluno',
      canEditExternalEnvironment: false,
      canCreateDiscipline: false,
      canAcceptTeacher: false,
      canRevokeUserType: false,
      canGiveUserType: false,
      canEditPermission: false,
      canDeleteUserType: false
    };
    const userId = '123';
    const addPhysicalAgent = jest.fn();
    const addJuridicalAgent = jest.fn();
    const addStudent = jest.fn();
    const addProfessor = jest.fn();
    
    beforeEach(() => {
      newUser = {
        name: 'John',
        email: 'john@test.com',
        password: 'password',
        type: 'Agente Externo',
        externalAgentType: 'Pessoa Fisica',
      };
      userType = {
        userTypeId: 1,
        typeName: 'Aluno',
        canEditExternalEnvironment: false,
        canCreateDiscipline: false,
        canAcceptTeacher: false,
        canRevokeUserType: false,
        canGiveUserType: false,
        canEditPermission: false,
        canDeleteUserType: false
      };
      userRepository.addUser.mockResolvedValue(userId);
      userRepository.addPhysicalAgent.mockImplementation(addPhysicalAgent);
      userRepository.addJuridicalAgent.mockImplementation(addJuridicalAgent);
      userRepository.addStudent.mockImplementation(addStudent);
      userRepository.addProfessor.mockImplementation(addProfessor);
      emailService.sendEmailRegister.mockResolvedValue();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should register a physical agent', async () => {
      userType.typeName = 'Pessoa Fisica';
      userTypeRepository.getUserTypeByName.mockResolvedValue([userType]);
      await expect(controller.registerUser(newUser)).resolves.toBeUndefined();
      expect(addPhysicalAgent).toHaveBeenCalledWith(userId, newUser);
      expect(addJuridicalAgent).not.toHaveBeenCalled();
      expect(addStudent).not.toHaveBeenCalled();
      expect(addProfessor).not.toHaveBeenCalled();
      expect(emailService.sendEmailRegister).toHaveBeenCalledWith(process.env.GMAIL_ACCOUNT, newUser.email, newUser.name);
    });

    it('should register a juridical agent', async () => {
        newUser.externalAgentType = 'Pessoa Juridica';
        userType.typeName = 'Pessoa Juridica';
        userTypeRepository.getUserTypeByName.mockResolvedValue([userType]);
        await expect(controller.registerUser(newUser)).resolves.toBeUndefined();
        expect(addPhysicalAgent).not.toHaveBeenCalledWith(userId, newUser);
        expect(addJuridicalAgent).toHaveBeenCalled();
        expect(addStudent).not.toHaveBeenCalled();
        expect(addProfessor).not.toHaveBeenCalled();
        expect(emailService.sendEmailRegister).toHaveBeenCalledWith(process.env.GMAIL_ACCOUNT, newUser.email, newUser.name);
    });

    it('should register a student agent', async () => {
        newUser.type = 'Aluno';
        userTypeRepository.getUserTypeByName.mockResolvedValue([userType]);
        await expect(controller.registerUser(newUser)).resolves.toBeUndefined();
        expect(addPhysicalAgent).not.toHaveBeenCalledWith(userId, newUser);
        expect(addJuridicalAgent).not.toHaveBeenCalled();
        expect(addStudent).toHaveBeenCalled();
        expect(addProfessor).not.toHaveBeenCalled();
        expect(emailService.sendEmailRegister).toHaveBeenCalledWith(process.env.GMAIL_ACCOUNT, newUser.email, newUser.name);
    });

    it('should register a professor agent', async () => {
        newUser.type = 'Professor';
        userType.typeName = 'Professor';
        User.findAll.mockResolvedValue([]);
        userTypeRepository.getUserTypeByName.mockResolvedValue([userType]);

        await expect(controller.registerUser(newUser)).resolves.toBeUndefined();
        expect(addPhysicalAgent).not.toHaveBeenCalledWith(userId, newUser);
        expect(addJuridicalAgent).not.toHaveBeenCalled();
        expect(addStudent).not.toHaveBeenCalled();
        expect(addProfessor).toHaveBeenCalled();
        expect(emailService.sendEmailRegister).toHaveBeenCalledWith(process.env.GMAIL_ACCOUNT, newUser.email, newUser.name);
    });

    it('should reject when bcrypt.hash throws an error', async () => {
      const error = new Error('hash error');
      jest.spyOn(bcrypt, 'hash').mockImplementation((_password, _saltRounds, callback) => {
        callback(error);
      });
      await expect(controller.registerUser(newUser)).rejects.toThrow(error);
    });

    it('should reject when userRepository.addUser throws an error', async () => {
      const error = new Error('add user error');
      userRepository.addUser.mockRejectedValue(error);
      userTypeRepository.getUserTypeByName.mockResolvedValue([userType]);
      await expect(controller.registerUser(newUser)).rejects.toThrow(error);
    });

    it('should reject when userRepository.addPhysicalAgent throws an error', async () => {
      const error = new Error('add physical agent error');
      userType.typeName = 'Pessoa Fisica';
      userRepository.addPhysicalAgent.mockRejectedValue(error);
      userTypeRepository.getUserTypeByName.mockResolvedValue([userType]);
      await expect(controller.registerUser(newUser)).rejects.toThrow(error);
    });

    it('should reject when userRepository.addJuridicalAgent throws an error', async () => {
      const error = new Error('add juridical agent error');
      userType.typeName = 'Pessoa Juridica';
      newUser.externalAgentType = 'Pessoa Juridica';
      userRepository.addJuridicalAgent.mockRejectedValue(error);
      userTypeRepository.getUserTypeByName.mockResolvedValue([userType]);
      await expect(controller.registerUser(newUser)).rejects.toThrow(error);
    });

    it('should reject when userRepository.addStudent throws an error', async () => {
      const error = new Error('add student error');
      newUser.type = 'Aluno';
      userRepository.addStudent.mockRejectedValue(error);
      userTypeRepository.getUserTypeByName.mockResolvedValue([userType]);
      await expect(controller.registerUser(newUser)).rejects.toThrow(error);
    });

    it('should reject when userRepository.addProfessor throws an error', async () => {
      const error = new Error('add professor error');
      userType.typeName = 'Professor';
      newUser.type = 'Professor';
      userRepository.addProfessor.mockRejectedValue(error);
      userTypeRepository.getUserTypeByName.mockResolvedValue([userType]);
      await expect(controller.registerUser(newUser)).rejects.toThrow(error);
    });

    it('should reject with "Tipo não encontrado" error for unknown user type', async () => {
        const newUser = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password',
          type: 'Unknown Type',
        };
        const hash = 'hashed_password';
        const expectedError = new Error('Tipo não encontrado');
        bcrypt.hash.mockImplementation((password, saltRounds, callback) => {
          callback(null, hash);
        });
        userRepository.addUser.mockResolvedValueOnce(123);

        const resultPromise = controller.registerUser(newUser);
        await expect(resultPromise).rejects.toThrow(expectedError);
      });

      it('should reject with "Tipo não encontrado" error for unknown external agent type', async () => {
        const newUser = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password',
          type: 'Agente Externo',
          externalAgentType: 'Unknown Type',
        };
        const hash = 'hashed_password';
        const expectedError = new Error('Tipo não encontrado');
        bcrypt.hash.mockImplementation((password, saltRounds, callback) => {
          callback(null, hash);
        });
        userRepository.addUser.mockResolvedValueOnce(123);

        const resultPromise = controller.registerUser(newUser);
        await expect(resultPromise).rejects.toThrow(expectedError);
      });
  })

  describe('checkUserAndGetUserData', () => {
    it('should return user data when user exists', async () => {
      const user = {
        email: 'test@example.com',
        password: 'test123',
      };
      const userData = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2022-05-10T00:00:00.000Z',
        updatedAt: '2022-05-10T00:00:00.000Z',
      };
      userRepository.checkUser.mockResolvedValue(1);
      userRepository.getUserData.mockResolvedValue(userData);
  
      const result = await controller.checkUserAndGetUserData(user);
  
      expect(userRepository.checkUser).toHaveBeenCalledWith(user);
      expect(userRepository.getUserData).toHaveBeenCalledWith(userData.id);
      expect(result).toEqual(userData);
    });
  });

  describe('updatePassword', () => {
    jest.mock('bcrypt');

    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should update password', async () => {
      const user = {
        email: 'john@example.com',
        password: 'newpassword',
      };
  
      const hashedPassword = 'hashedPassword';
      const updatedUser = { email: user.email };
      
      bcrypt.hash.mockImplementation((_password, _saltRounds, callback) => {
        callback(null, hashedPassword);
      });
      userRepository.updateUserPassword.mockResolvedValue(updatedUser);
  
      await expect(controller.updatePassword(user)).resolves.toEqual({ email: user.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10, expect.any(Function));
      expect(userRepository.updateUserPassword).toHaveBeenCalledWith(user.email, hashedPassword);
    });
  
    it('should reject when bcrypt.hash throws an error', async () => {
      const user = {
        email: 'john@example.com',
        password: 'newpassword',
      };
  
      const error = new Error('bcrypt error');
      
      bcrypt.hash.mockImplementation((_password, _saltRounds, callback) => {
        callback(error);
      });
  
      await expect(controller.updatePassword(user)).rejects.toThrow(error);
      expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10, expect.any(Function));
      expect(userRepository.updateUserPassword).not.toHaveBeenCalled();
    });
    
  });

  describe('recoverPassword', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    it('should recover password and return status 200', async () => {
      const user = {
        email: 'john@example.com',
        token: 'eywjk'
      };
  
      const userData = [
        {
          email: user.email,
        },
      ];
      const emailInfo = {
        subject: 'Password Recovery',
        message: 'Please reset your password.',
      };
  
      userRepository.checkUserByEmail.mockResolvedValue(userData);
      emailService.sendEmail.mockResolvedValue(emailInfo);
  
      await expect(controller.recoverPassword(user)).resolves.toEqual({
        ...emailInfo,
        status: 200,
      });
      expect(userRepository.checkUserByEmail).toHaveBeenCalledWith(user.email);
      expect(emailService.sendEmail).toHaveBeenCalledWith(process.env.GMAIL_ACCOUNT, user.email, user.token);
    });
  
    it('should recover password and return status 404 when user does not exist', async () => {
      const user = {
        email: 'john@example.com',
      };
  
      const userData = [];
      userRepository.checkUserByEmail.mockResolvedValue(userData);
  
      await expect(controller.recoverPassword(user)).resolves.toEqual({ status: 404 });
      expect(userRepository.checkUserByEmail).toHaveBeenCalledWith(user.email);
      expect(emailService.sendEmail).not.toHaveBeenCalled();
    });
  });

  describe('getAllUsers', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    it('should get all users and return status 200', async () => {
      const responseMocked = [
        {
          userId: 1
        }
      ];

      const expected = [
        {
          userId: 1,
          user_properties: {}
        }
      ];
  
      userRepository.getAllUsers.mockResolvedValue(responseMocked);
      userRepository.getUserProperties.mockResolvedValue({});

      const response = await controller.getAllUsers();
      expect(response).toEqual(expected)
    });

    it('should reject when userRepository.getAllUsers throws an error', async () => {
      const error = new Error('add user error');
      userRepository.getAllUsers.mockRejectedValue(error);
      await expect(controller.getAllUsers()).rejects.toThrow(error);
    });
  });

  describe('Token', () => {
    const SECRET = 'your-secret-key';
    const email = 'test@example.com';
  
    describe('generateToken', () => {
      it('should generate a valid token', () => {
        process.env.SECRET = SECRET
        const token = controller.generateToken(email);
        const decoded = jwt.verify(token, process.env.SECRET);
        expect(decoded.email).toBe(email);
      });
    });
  
    describe('decodeToken', () => {
      it('should decode a valid token and return the payload', () => {
        process.env.SECRET = SECRET
        const payload = { email };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
        const decoded = controller.decodeToken(token);
        expect(decoded.email).toBe(email);
      });
  
      it('should throw an error for an invalid token', () => {
        process.env.SECRET = SECRET
        const invalidToken = 'invalid-token';
        expect(() => {
          controller.decodeToken(invalidToken);
        }).toThrow();
      });
    });
  });
})

