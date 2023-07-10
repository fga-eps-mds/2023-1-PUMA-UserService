const Contact = require('../../../src/db/model/Contact');
const contactRepository = require('../../../src/repository/contactRepository');

jest.mock('../../../src/db/model/Contact');

describe('contactRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addContact', () => {
    it('should add a new contact', async () => {
      const newContact = {
        name: 'teste',
        email: 'teste@example.com',
        image: 'contact.jpg',
      };

      const contactResponse = {
        contactId: 1,
        name: 'teste',
        email: 'teste@example.com',
        image: 'contact.jpg',
      };

      Contact.create.mockResolvedValue(contactResponse);

      await expect(contactRepository.addContact(newContact)).resolves.toEqual(contactResponse.contactId);
      expect(Contact.create).toHaveBeenCalledWith(newContact);
    });

    it('should reject when Contact.create throws an error', async () => {
      const newContact = {
        name: 'teste',
        email: 'teste@example.com',
        image: 'contact.jpg',
      };

      const error = new Error('addContact error');
      Contact.create.mockRejectedValue(error);

      await expect(contactRepository.addContact(newContact)).rejects.toThrow(error);
      expect(Contact.create).toHaveBeenCalledWith(newContact);
    });
  });

  describe('getContacts', () => {
    it('should get all contacts', async () => {
      const contactsResponse = [
        {
          contactId: 1,
          name: 'teste',
          email: 'teste@example.com',
          image: 'contact1.jpg',
        },
        {
          contactId: 2,
          name: 'teste 2',
          email: 'teste2@example.com',
          image: 'contact2.jpg',
        },
      ];

      Contact.findAll.mockResolvedValue(contactsResponse);

      await expect(contactRepository.getContacts()).resolves.toEqual(contactsResponse);
      expect(Contact.findAll).toHaveBeenCalled();
    });

    it('should reject when Contact.findAll throws an error', async () => {
      const error = new Error('getContacts error');
      Contact.findAll.mockRejectedValue(error);

      await expect(contactRepository.getContacts()).rejects.toThrow(error);
      expect(Contact.findAll).toHaveBeenCalled();
    });
  });

  describe('deleteContacts', () => {
    it('should delete a contact', async () => {
      const contactId = 1;

      Contact.destroy.mockResolvedValue(true);

      await expect(contactRepository.deleteContacts(contactId)).resolves.toEqual(true);
      expect(Contact.destroy).toHaveBeenCalledWith({
        where: { contactId: contactId },
      });
    });

    it('should reject when Contact.destroy throws an error', async () => {
      const contactId = 1;

      const error = new Error('deleteContacts error');
      Contact.destroy.mockRejectedValue(error);

      await expect(contactRepository.deleteContacts(contactId)).rejects.toThrow(error);
      expect(Contact.destroy).toHaveBeenCalledWith({
        where: { contactId: contactId },
      });
    });
  });

  describe('updateContact', () => {
    it('should update a contact', async () => {
      const contactId = 1;
      const updatedContact = {
        name: 'teste',
        email: 'teste@example.com',
        image: 'updated-contact.jpg',
      };

      Contact.update.mockResolvedValue(true);

      await expect(contactRepository.updateContact(contactId, updatedContact)).resolves.toEqual(true);
      expect(Contact.update).toHaveBeenCalledWith(
        {
          name: updatedContact.name,
          email: updatedContact.email,
          image: updatedContact.image,
        },
        { where: { contactId: contactId } }
      );
    });

    it('should reject when Contact.update throws an error', async () => {
      const contactId = 1;
      const updatedContact = {
        name: 'teste',
        email: 'teste@example.com',
        image: 'updated-contact.jpg',
      };

      const error = new Error('updateContact error');
      Contact.update.mockRejectedValue(error);

      await expect(contactRepository.updateContact(contactId, updatedContact)).rejects.toThrow(error);
      expect(Contact.update).toHaveBeenCalledWith(
        {
          name: updatedContact.name,
          email: updatedContact.email,
          image: updatedContact.image,
        },
        { where: { contactId: contactId } }
      );
    });
  });
});
