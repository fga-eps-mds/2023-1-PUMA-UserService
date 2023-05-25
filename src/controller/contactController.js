const contactRepository = require('../repository/contactRepository');

module.exports = {
    createContact: (newContact) => new Promise( async (resolve, reject) => {
        try {
            const contactId = await contactRepository.addContact(newContact);
            resolve(contactId);
        } catch (error) {
            reject(error);
        }
    }),

    getContacts: () => new Promise ( async (resolve, reject) => {
        try {
            const contacts = await contactRepository.getContacts();
            resolve(contacts);
        } catch (error) {
            reject(error);
        }
    }),
};