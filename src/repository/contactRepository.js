const Contact = require('../db/model/Contact');

module.exports = {
    addContact: (newContact) => new Promise((resolve, reject) => {
        Contact.create({
            name: newContact.name,
            email: newContact.email,
            image: newContact.image,
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

    deleteContacts: (contactId) => new Promise((resolve, reject) => {
      try {
          Contact.destroy({
            where: { contactId: contactId }
          })
            .then((response) => resolve(true))
            .catch((e) => reject(e));
        } catch (e) {
          reject(e);
        }
    }),

    updateContact: (contactId, newContact) => new Promise((resolve, reject) => {
      Contact.update(
        { name: newContact.name, email: newContact.email, image: newContact.image, },
        { where: { contactId: contactId } }
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }),
};