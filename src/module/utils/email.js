import nodemailer from "nodemailer";

const sendEmail=async({ from = process.env.EMAIL, to, cc, bcc, subject, text, html, attachments = [] } = {})=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        }
    });
      const info = await transporter.sendMail({
          from: `${from} <${from}>`, // sender address
          to: to, // list of receivers
          //cc mention
          //bcc mention hidden
          subject: subject, // Subject line
          text: text, // plain text body
          html: html, // html body
    });
    console.log(info);
}

export default sendEmail