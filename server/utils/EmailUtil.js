const nodemailer = require("nodemailer");
const MyConstants = require("./MyConstants");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MyConstants.EMAIL_USER,
    pass: MyConstants.EMAIL_PASS,
  },
});
const EmailUtil = {
  generateEmailContent(id, token) {
    const styles = `
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
        }
        h1 {
          color: #3366cc;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
        }
        .info {
          font-size: 16px;
        }
        .label {
          font-weight: bold;
        }
      </style>
    `;

    const content = `
      <h1>Thanks for signing up</h1>
      <p class="info">Please input the following information to activate your account:</p>
      <p class="info">
        <span class="label">.id:</span> ${id}<br>
        <span class="label">.token:</span> ${token}
      </p>
    `;

    return styles + content;
  },
  send(email, id, token) {
    const emailContent = this.generateEmailContent(id, token);
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h1 style="color: #3366cc; font-size: 24px; font-weight: bold; text-align: center;">Thanks for signing up</h1>
      <h1 style="font-size: 16px; text-align: center;"">Please click the button below to activate your account</h1>
      <p style="text-align: center;">
        <a href="http://localhost:3002/account/active/${id}/${token}" 
          style="display: inline-block; padding: 12px 24px; background-color: #3366cc; color: #fff; text-decoration: none; font-size: 16px; border-radius: 4px;">
          Activate Account
        </a>
      </p>
    </div>
  `;
    return new Promise(function (resolve, reject) {
      const mailOptions = {
        from: MyConstants.EMAIL_USER,
        to: email,
        subject: "Signup | Verification",
        html: htmlContent,
      };
      transporter.sendMail(mailOptions, function (err, result) {
        if (err) reject(err);
        resolve(true);
      });
    });
  },
};
module.exports = EmailUtil;
