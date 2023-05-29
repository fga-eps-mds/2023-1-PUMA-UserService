const nodemailer = require('nodemailer');

module.exports = {
  async sendEmail(mailerAddress, receiverAddress) {
    const settings = {
      service: process.env.EMAIL_SERVICE,
      port: parseInt(process.env.EMAIL_PORT, 10),
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_APP_PASS,
      },
    };

    const transporter = nodemailer.createTransport(settings);

    const info = await transporter.sendMail({
      from: {
        name: 'Puma',
        address: mailerAddress,
      },
      to: {
        name: 'Usuário',
        address: receiverAddress,
      },
      subject: 'Puma - Recuperação de Senha',
      html: `<h1> Clique no link para recuperar sua senha: <a href='${global.URL_FRONT}/atualizar-senha/'>RECUPERAR SENHA</a> </h1>`,
    });
    

    return info;
  },

  async sendEmailConfimationPasswordUpdated (mailerAddress, receiverAddress) {
    const settings = {
      service: process.env.EMAIL_SERVICE,
      port: parseInt(process.env.EMAIL_PORT, 10),
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_APP_PASS,
      },
    };

    const transporter = nodemailer.createTransport(settings);

    const info = await transporter.sendMail({
      from: {
        name: 'Puma',
        address: mailerAddress,
      },
      to: {
        name: 'Usuário',
        address: receiverAddress,
      },
      subject: 'Puma - Senha Atualizada',

      html: `<h1> Senha atualizada com sucesso </h1>`,
    });
    

    return info;
  },

  async sendEmailRegister(mailerAddress, receiverAddress, userName) {
    const settings = {
      service: process.env.EMAIL_SERVICE,
      port: parseInt(process.env.EMAIL_PORT, 10),
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_APP_PASS,
      },
    };

    const transporter = nodemailer.createTransport(settings);

    const date = new Date();

    const info = await transporter.sendMail({
      from: {
        name: 'Puma',
        address: mailerAddress,
      },
      to: {
        name: 'Usuário',
        address: receiverAddress,
      },
      subject: 'Puma - Novo Cadastro',
      html: "<h1> Olá " + userName + ", seja bem-vindo a plataforma PUMA!!!</h1><p>Cadastro efetuado no dia " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "</p>",
    });

    return info;
  },

  async sendEmailTeacherAccepted(mailerAddress, receiverAddress, userName) {
    const settings = {
      service: process.env.EMAIL_SERVICE,
      port: parseInt(process.env.EMAIL_PORT, 10),
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_APP_PASS,
      },
    };

    const transporter = nodemailer.createTransport(settings);

    const info = await transporter.sendMail({
      from: {
        name: 'Puma',
        address: mailerAddress,
      },
      to: {
        name: 'Usuário',
        address: receiverAddress,
      },
      subject: 'Puma - Cadastro aceito',
      html: "<h1> Olá " + userName + ", seu cadastro foi aceito na PUMA, você já pode acessar área logada !!!</h1>",
    });

    return info;
  },

  async sendEmailTeacherRefused(mailerAddress, receiverAddress, userName) {
    const settings = {
      service: process.env.EMAIL_SERVICE,
      port: parseInt(process.env.EMAIL_PORT, 10),
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_APP_PASS,
      },
    };

    const transporter = nodemailer.createTransport(settings);

    const info = await transporter.sendMail({
      from: {
        name: 'Puma',
        address: mailerAddress,
      },
      to: {
        name: 'Usuário',
        address: receiverAddress,
      },
      subject: 'Puma - Cadastro recusado',
      html: "<h1> Olá " + userName + ", infelizmente seu cadastro foi recusado na PUMA, por favor entre em contato com os administradores para entender melhor o porque.</h1>",
    });

    return info;
  },

  async sendEmailAdminNewTeacher(mailerAddress, receiverAddress) {
    const settings = {
      service: process.env.EMAIL_SERVICE,
      port: parseInt(process.env.EMAIL_PORT, 10),
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_APP_PASS,
      },
    };

    const transporter = nodemailer.createTransport(settings);

    const info = await transporter.sendMail({
      from: {
        name: 'Puma',
        address: mailerAddress,
      },
      to: {
        name: 'Usuário',
        address: receiverAddress,
      },
      subject: 'Puma - Novo Professor',
      html: "<h1> Olá, voce tem pendente um novo cadastro de professor para realizar o aceite ou a recusa. </h1>",
    });

    return info;
  },
};
