const nodemailer = require('nodemailer');
const emailService = require('../../../src/services/emailService');

jest.mock('nodemailer');

describe('Email Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    it('should send an email successfully', async () => {
      const mailerAddress = 'sender@example.com';
      const receiverAddress = 'receiver@example.com';

      const transporterMock = {
        sendMail: jest.fn().mockResolvedValue('Email sent successfully'),
      };
      nodemailer.createTransport.mockReturnValue(transporterMock);

      const expectedEmailInfo = 'Email sent successfully';

      const emailInfo = await emailService.sendEmail(mailerAddress, receiverAddress);

      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        service: process.env.EMAIL_SERVICE,
        port: parseInt(process.env.EMAIL_PORT, 10),
        auth: {
          user: process.env.GMAIL_ACCOUNT,
          pass: process.env.GMAIL_APP_PASS,
        },
      });

      expect(transporterMock.sendMail).toHaveBeenCalledWith({
        from: {
          name: 'Puma',
          address: mailerAddress,
        },
        to: {
          name: 'Usuário',
          address: receiverAddress,
        },
        subject: 'Puma - Recuperação de Senha',
        html: "<h1> Clique no link para recuperar sua senha: <a href='http://146.190.123.60:8080/usuario/atualizar-senha/'>RECUPERAR SENHA</a> <h1>",
      });

      expect(emailInfo).toEqual(expectedEmailInfo);
    });
  });

  describe('sendEmailRegister', () => {
    it('should send a registration email successfully', async () => {
      const mailerAddress = 'sender@example.com';
      const receiverAddress = 'receiver@example.com';
      const userName = 'John Doe';

      const transporterMock = {
        sendMail: jest.fn().mockResolvedValue('Email sent successfully'),
      };
      nodemailer.createTransport.mockReturnValue(transporterMock);

      const emailInfo = await emailService.sendEmailRegister(mailerAddress, receiverAddress, userName);

      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        service: process.env.EMAIL_SERVICE,
        port: parseInt(process.env.EMAIL_PORT, 10),
        auth: {
          user: process.env.GMAIL_ACCOUNT,
          pass: process.env.GMAIL_APP_PASS,
        },
      });

      const date = new Date();
      const expectedHtml = "<h1> Olá " + userName + ", seja bem-vindo a plataforma PUMA!!!<h1><p>Cadastro efetuado no dia " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "</p>";

      expect(transporterMock.sendMail).toHaveBeenCalledWith({
        from: {
          name: 'Puma',
          address: mailerAddress,
        },
        to: {
          name: 'Usuário',
          address: receiverAddress,
        },
        subject: 'Puma - Novo Cadastro',
        html: expectedHtml,
      });
    });
  });
});
