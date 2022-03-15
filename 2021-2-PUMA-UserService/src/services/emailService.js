const nodemailer = require('nodemailer');

module.exports = {
  async sendEmail(mailerName, mailerAddress, receiverName, receiverAddress) {
    const mailtrap = {
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '81c64a48f89083',
        pass: '4874816175ffe9',
      },
    };

    const transporter = nodemailer.createTransport(mailtrap);

    const info = await transporter.sendMail({
      from: {
        name: mailerName,
        address: mailerAddress,
      },
      to: {
        name: receiverName,
        address: receiverAddress,
      },
      subject: 'Puma - Recuperação de Senha',
      html: "<h1> Recupere sua senha em senha: <a href='https://puma-2021-2.netlify.app'>Puma</a> <h1>",
    });

    return info;
  },
};