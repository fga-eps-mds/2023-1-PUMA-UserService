const User_Type = require('../../../src/db/model/User_Type');
const userTypeRepository = require('../../../src/repository/userTypeRepository');

jest.mock('../../../src/db/model/User_Type');

describe('User Type Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addUserType', () => {
    it('should add a new user type successfully', async () => {
      const newUserType = {
        typeName: 'Admin',
        description: 'Administrator User Type',
      };

      const createdUserType = {
        userTypeid: 1,
      };

      User_Type.create.mockResolvedValue(createdUserType);

      const expectedUserTypeId = 1;

      const userType = await userTypeRepository.addUserType(newUserType);

      expect(User_Type.create).toHaveBeenCalledWith({
        typeName: newUserType.typeName,
        description: newUserType.description,
      });

      expect(userType).toEqual(expectedUserTypeId);
    });

    it('should handle errors when adding a new user type', async () => {
      const newUserType = {
        typeName: 'Admin',
        description: 'Administrator User Type',
      };

      const error = 'Internal Server Error';

      User_Type.create.mockRejectedValue(error);

      await expect(userTypeRepository.addUserType(newUserType)).rejects.toEqual(error);

      expect(User_Type.create).toHaveBeenCalledWith({
        typeName: newUserType.typeName,
        description: newUserType.description,
      });
    });
  });

  describe('getUserType', () => {
    it('should get a user type by ID successfully', async () => {
      const userTypeId = 1;

      const userTypes = [
        {
          userTypeId: 1,
          typeName: 'Admin',
          description: 'Administrator User Type',
        },
      ];

      User_Type.findAll.mockResolvedValue(userTypes);

      const expectedUserType = userTypes;

      const userType = await userTypeRepository.getUserType(userTypeId);

      expect(User_Type.findAll).toHaveBeenCalledWith({
        where: {
          userTypeId: userTypeId,
        },
      });

      expect(userType).toEqual(expectedUserType);
    });

    it('should get all user types successfully', async () => {
      const userTypes = [
        {
          userTypeId: 1,
          typeName: 'Admin',
          description: 'Administrator User Type',
        },
        {
          userTypeId: 2,
          typeName: 'User',
          description: 'Regular User Type',
        },
      ];

      User_Type.findAll.mockResolvedValue(userTypes);

      const expectedUserTypes = userTypes;

      const userType = await userTypeRepository.getUserType();

      expect(User_Type.findAll).toHaveBeenCalledWith();

      expect(userType).toEqual(expectedUserTypes);
    });

    it('should handle errors when getting user types', async () => {
      const userTypeId = 1;

      const error = 'Internal Server Error';

      User_Type.findAll.mockRejectedValue(error);

      await expect(userTypeRepository.getUserType(userTypeId)).rejects.toEqual(error);

      expect(User_Type.findAll).toHaveBeenCalledWith({
        where: {
          userTypeId: userTypeId,
        },
      });
    });
  });

  describe('updateUserType', () => {
    it('should update a user type successfully', async () => {
      const userTypeId = 1;
      const newUserType = {
        typeName: 'SuperAdmin',
        description: 'Super Administrator User Type',
      };

      const updatedUserType = {
        userTypeId: 1,
      };

      User_Type.update.mockResolvedValue([1, [updatedUserType]]);

      const expectedUserTypeId = 1;

      const userType = await userTypeRepository.updateUserType(userTypeId, newUserType);

      expect(User_Type.update).toHaveBeenCalledWith(
        { typeName: newUserType.typeName, description: newUserType.description },
        { where: { userTypeId: userTypeId }, returning: true }
      );

      expect(userType).toEqual(expectedUserTypeId);
    });

    it('should handle errors when updating a user type', async () => {
      const userTypeId = 1;
      const newUserType = {
        typeName: 'SuperAdmin',
        description: 'Super Administrator User Type',
      };

      const error = 'Internal Server Error';

      User_Type.update.mockRejectedValue(error);

      await expect(userTypeRepository.updateUserType(userTypeId, newUserType)).rejects.toEqual(error);

      expect(User_Type.update).toHaveBeenCalledWith(
        { typeName: newUserType.typeName, description: newUserType.description },
        { where: { userTypeId: userTypeId }, returning: true }
      );
    });
  });

  describe('deleteUserType', () => {
    it('should delete a user type successfully', async () => {
      const userTypeId = 1;

      User_Type.destroy.mockResolvedValue(true);

      const expectedResponse = true;

      const response = await userTypeRepository.deleteUserType(userTypeId);

      expect(User_Type.destroy).toHaveBeenCalledWith({
        where: { userTypeId: userTypeId },
      });

      expect(response).toEqual(expectedResponse);
    });

    it('should handle errors when deleting a user type', async () => {
      const userTypeId = 1;

      const error = 'Internal Server Error';

      User_Type.destroy.mockRejectedValue(error);

      await expect(userTypeRepository.deleteUserType(userTypeId)).rejects.toEqual(error);

      expect(User_Type.destroy).toHaveBeenCalledWith({
        where: { userTypeId: userTypeId },
      });
    });
  });
});
