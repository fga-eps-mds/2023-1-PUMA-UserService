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
      //use abaixo para testar no ambiente de desenvolvimento
      //html: "<h1> Clique no link para recuperar sua senha: <a href='http://localhost:8080/usuario/atualizar-senha/'>RECUPERAR SENHA</a> <h1>",

      //use abaixo em produção
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
      //use abaixo para testar no ambiente de desenvolvimento
      //html: "<h1> Clique no link para recuperar sua senha: <a href='http://localhost:8080/usuario/atualizar-senha/'>RECUPERAR SENHA</a> <h1>",

      //use abaixo em produção
      html: "<h1> Olá " + userName + ", seja bem-vindo a plataforma PUMA!!!<h1><p>Cadastro efetuado no dia " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "</p>",
    });

    return info;
  },

  async sendEmailToTecaherAcepted(mailerAddress, receiverAddress) {
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
      subject: 'Puma - Cadastro aprovado',
      //Email a ser enviado para o professor depois do feedback de aprovação do programa
      //Mensagem reproduzida pelo usuário
      html: `<h1> Obrigado por fazer seu cadastro, seu status agora é de professor ativo </h1>`,
    });
    

    return info;
  },

  async sendEmailToTecaherRejected(mailerAddress, receiverAddress) {
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
      subject: 'Puma - Cadastro rejeitado',
      //Email a ser enviado para o professor depois do feedback de aprovação do programa
      //Mensagem reproduzida pelo usuário
      html: `<h1> Desculpe, mas por algum motivo seu cadastro foi negado em nossa plataforma, entre em contato com os responsáveis <h1>`,
    });
    

    return info;
  },

  async sendEmailtoAdiminForTeacherAcepted(mailerAddress, receiverAddress) {
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
      subject: 'Puma - Professor aceito',
      //Email a ser enviado para o professor depois do feedback de aprovação do programa
      //Mensagem reproduzida pelo usuário
      html: `<h1> Temos mais um professor cadastrado na nossa plataforma. <h1>`,
    });
    

    return info;
  },
};
