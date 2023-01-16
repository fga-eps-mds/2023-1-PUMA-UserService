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
      html: "<h1> Clique no link para recuperar sua senha: <a href='http://146.190.123.60:8080/usuario/atualizar-senha/'>RECUPERAR SENHA</a> <h1>",
    });

    return info;
  },
};
