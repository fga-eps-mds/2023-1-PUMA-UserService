const nodemailer = require('nodemailer');

module.exports = {
  async sendEmail(mailerAddress, receiverAddress) {
    const settings = {
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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
      html: "<h1> Clique no link para recuperar sua senha: <a href='https://puma-2021-2.netlify.app/usuario/newPassword'>Puma</a> <h1>",
    });

    return info;
  },
};
