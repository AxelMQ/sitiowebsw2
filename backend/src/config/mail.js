import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.MAIL_USERNAME;
const pass = process.env.MAIL_PASSWORD;

if (!user || !pass) {
  console.warn("ADVERTENCIA: Las variables MAIL_USERNAME o MAIL_PASSWORD no están configuradas en el archivo .env. El envío de correos fallará.");
}

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user,
    pass
  },
  tls: {
    rejectUnauthorized: false
  }
});
