import transporter from '../../config/emailTransporter';

const sendAccountActivation = async (email, token) => {
  await transporter.sendMail({
    from: 'My App <contact@my-app.com>',
    to: email,
    subject: 'Account Activation',
    html: `Token is ${token}`,
  });
};

export default { sendAccountActivation };
