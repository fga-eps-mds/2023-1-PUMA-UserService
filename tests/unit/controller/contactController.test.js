const contactRepository = require('../../../src/repository/contactRepository');
const contactController = require('../../../src/controller/contactController');

jest.mock('../../../src/repository/contactRepository');

describe('contactController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createContact', () => {
    it('should create a new contact', async () => {
      const newContact = {
        name: 'Teste nome',
        email: 'johndoe@example.com',
        message: 'Test message',
      };

      const contactResponse = {
        id: 1,
        name: 'teste',
        email: 'teste@example.com',
        message: 'Test message',
      };

      contactRepository.addContact.mockResolvedValue(contactResponse);

      await expect(contactController.createContact(newContact)).resolves.toEqual(contactResponse);
      expect(contactRepository.addContact).toHaveBeenCalledWith(newContact);
    });

    it('should reject when contactRepository.addContact throws an error', async () => {
      const newContact = {
        name: 'teste',
        email: 'teste@example.com',
        message: 'Test message',
      };

      const error = new Error('addContact error');
      contactRepository.addContact.mockRejectedValue(error);

      await expect(contactController.createContact(newContact)).rejects.toThrow(error);
      expect(contactRepository.addContact).toHaveBeenCalledWith(newContact);
    });
  });

  describe('getContacts', () => {
    it('should get all contacts', async () => {
      const contactsResponse = [
        {
          id: 1,
          name: 'teste',
          email: 'teste@example.com',
          message: 'Test message',
        },
        {
          id: 2,
          name: 'teste 2',
          email: 'teste2@example.com',
          message: 'Another message',
        },
      ];

      contactRepository.getContacts.mockResolvedValue(contactsResponse);

      await expect(contactController.getContacts()).resolves.toEqual(contactsResponse);
      expect(contactRepository.getContacts).toHaveBeenCalled();
    });

    it('should reject when contactRepository.getContacts throws an error', async () => {
      const error = new Error('getContacts error');
      contactRepository.getContacts.mockRejectedValue(error);

      await expect(contactController.getContacts()).rejects.toThrow(error);
      expect(contactRepository.getContacts).toHaveBeenCalled();
    });
  });

  describe('updateContact', () => {
    it('should update a contact', async () => {
      const contactId = 1;
      const updatedContact = {
        name: 'teste',
        email: 'teste@example.com',
        message: 'Updated message',
      };

      const response = {
        id: contactId,
        name: 'teste',
        email: 'teste@example.com',
        message: 'Updated message',
      };

      contactRepository.updateContact.mockResolvedValue(response);

      await expect(contactController.updateContact(contactId, updatedContact)).resolves.toEqual(response);
      expect(contactRepository.updateContact).toHaveBeenCalledWith(contactId, updatedContact);
    });

    it('should reject when contactRepository.updateContact throws an error', async () => {
      const contactId = 1;
      const updatedContact = {
        name: 'teste',
        email: 'teste@example.com',
        message: 'Updated message',
      };

      const error = new Error('updateContact error');
      contactRepository.updateContact.mockRejectedValue(error);

      await expect(contactController.updateContact(contactId, updatedContact)).rejects.toThrow(error);
      expect(contactRepository.updateContact).toHaveBeenCalledWith(contactId, updatedContact);
    });
  });

  describe('deleteContact', () => {
    it('should delete a contact', async () => {
      const contactId = 1;

      const response = {
        id: contactId,
        name: 'teste',
        email: 'teste@example.com',
        message: 'Test message',
      };

      contactRepository.deleteContacts.mockResolvedValue(response);

      await expect(contactController.deleteContact(contactId)).resolves.toEqual(response);
      expect(contactRepository.deleteContacts).toHaveBeenCalledWith(contactId);
    });

    it('should reject when contactRepository.deleteContacts throws an error', async () => {
      const contactId = 1;

      const error = new Error('deleteContacts error');
      contactRepository.deleteContacts.mockRejectedValue(error);

      await expect(contactController.deleteContact(contactId)).rejects.toThrow(error);
      expect(contactRepository.deleteContacts).toHaveBeenCalledWith(contactId);
    });
  });
});
