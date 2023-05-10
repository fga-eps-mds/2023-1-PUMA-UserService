const userTypeRepository = require('../../../src/repository/userTypeRepository');
const controller = require('../../../src/controller/userTypeController');

jest.mock('../../../src/repository/userTypeRepository');

describe('userTypeController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addUserType', () => {
    it('should add a new user type', async () => {
      const newUserType = {
        typeName: 'Admin',
      };

      const userTypeResponse = 'Admin';

      userTypeRepository.addUserType.mockResolvedValue(userTypeResponse);

      await expect(controller.addUserType(newUserType)).resolves.toEqual({
        typeName: userTypeResponse,
      });
      expect(userTypeRepository.addUserType).toHaveBeenCalledWith(newUserType);
    });

    it('should reject when userTypeRepository.addUserType throws an error', async () => {
      const newUserType = {
        typeName: 'Admin',
      };

      const error = new Error('addUserType error');
      userTypeRepository.addUserType.mockRejectedValue(error);

      await expect(controller.addUserType(newUserType)).rejects.toThrow(error);
      expect(userTypeRepository.addUserType).toHaveBeenCalledWith(newUserType);
    });
  });

  describe('getUserType', () => {
    it('should get a user type by ID', async () => {
      const userTypeId = 1;
      const userTypeResponse = { id: userTypeId, typeName: 'Admin' };

      userTypeRepository.getUserType.mockResolvedValue([userTypeResponse]);

      await expect(controller.getUserType(userTypeId)).resolves.toEqual(userTypeResponse);
      expect(userTypeRepository.getUserType).toHaveBeenCalledWith(userTypeId);
    });

    it('should get all user types when no ID is provided', async () => {
      const userTypesResponse = [
        { id: 1, typeName: 'Admin' },
        { id: 2, typeName: 'User' },
      ];

      userTypeRepository.getUserType.mockResolvedValue(userTypesResponse);

      await expect(controller.getUserType()).resolves.toEqual(userTypesResponse);
      expect(userTypeRepository.getUserType).toHaveBeenCalledWith();
    });

    it('should reject when userTypeRepository.getUserType throws an error', async () => {
      const userTypeId = 1;

      const error = new Error('getUserType error');
      userTypeRepository.getUserType.mockRejectedValue(error);

      await expect(controller.getUserType(userTypeId)).rejects.toThrow(error);
      expect(userTypeRepository.getUserType).toHaveBeenCalledWith(userTypeId);
    });
  });

  describe('updateUserType', () => {
    it('should update a user type', async () => {
      const userTypeId = 1;
      const newUserType = { typeName: 'User' };

      const response = { id: userTypeId, typeName: 'User' };

      userTypeRepository.updateUserType.mockResolvedValue(response);

      await expect(controller.updateUserType(userTypeId, newUserType)).resolves.toEqual(response);
      expect(userTypeRepository.updateUserType).toHaveBeenCalledWith(userTypeId, newUserType);
    });

    it('should reject when userTypeRepository.updateUserType throws an error', async () => {
      const userTypeId = 1;
      const newUserType = { typeName: 'User' };

      const error = new Error('updateUserType error');
      userTypeRepository.updateUserType.mockRejectedValue(error);

      await expect(controller.updateUserType(userTypeId, newUserType)).rejects.toThrow(error);
      expect(userTypeRepository.updateUserType).toHaveBeenCalledWith(userTypeId, newUserType);
    });
  });

  describe('deleteUserType', () => {
    it('should delete a user type', async () => {
        const userTypeId = 1;
  
        const response = { id: userTypeId, typeName: 'Admin' };
  
        userTypeRepository.deleteUserType.mockResolvedValue(response);
  
        await expect(controller.deleteUserType(userTypeId)).resolves.toEqual(response);
        expect(userTypeRepository.deleteUserType).toHaveBeenCalledWith(userTypeId);
      });
  
      it('should reject when userTypeRepository.deleteUserType throws an error', async () => {
        const userTypeId = 1;
  
        const error = new Error('deleteUserType error');
        userTypeRepository.deleteUserType.mockRejectedValue(error);
  
        await expect(controller.deleteUserType(userTypeId)).rejects.toThrow(error);
        expect(userTypeRepository.deleteUserType).toHaveBeenCalledWith(userTypeId);
      });
    });
  });
