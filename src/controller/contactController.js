const contactRepository = require('../repository/contactRepository');

module.exports = {
    createContact: (newContact) => new Promise((resolve, reject) => {
        contactRepository.addContact(newContact).then((response) => {
            resolve(response);
        }).catch((response) => {
            reject(response);
        });
    }),

    getContacts: () => new Promise((resolve, reject) => {
        contactRepository.getContacts().then((response) => {
            resolve(response);
        }).catch((response) => {
            reject(response);
        });
    }),

    updateContact: (contactId, newContact) => new Promise((resolve, reject) => {
        contactRepository.updateContact(contactId, newContact).then((response) => {
            resolve(response);
        }).catch((response) => {
            reject(response);
        });
    }),

    deleteContact: (contactId) => new Promise((resolve, reject) => {
        contactRepository.deleteContacts(contactId).then((response) => {
            resolve(response);
        }).catch((response) => {
            reject(response);
        });
    }),
};