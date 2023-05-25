const Contact = require('../db/model/Contact');

module.exports = {
    addContact: (newContact) => new Promise((resolve, reject) => {
        Contact.create({
            name: newContact.name,
            email: newContact.email
        })
        .then((response) => {
            resolve(response.contactId);
          })
          .catch((response) => {
            reject(response);
          });
    }),

    getContacts: () => new Promise((resolve, reject) => {
        try {
            Contact.findAll()
              .then((response) => resolve(response))
              .catch((e) => reject(e));
          } catch (e) {
            reject(e);
          }
    }),
};