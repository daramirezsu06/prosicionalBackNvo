import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
const baseDir =
  process.env.NODE_ENV === 'production'
    ? path.join(process.cwd(), 'dist')
    : path.join(process.cwd(), 'src');
const header = fs
  .readFileSync(path.join(baseDir, './assets/template/header.html'), 'utf-8')
  .toString();
const footer = fs
  .readFileSync(path.join(baseDir, './assets/template/footer.html'), 'utf-8')
  .toString();

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    // Configuración del transportador de nodemailer para Gmail
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Correo de la cuenta Gmail
        pass: process.env.GMAIL_PASSWORD, // Contraseña o App Password de Gmail
      },
    });
  }

  async sendEmail(to: string, subject: string, content: string) {
    const html = header + content + footer;

    try {
      const mailOptions = {
        from: process.env.GMAIL_USER, // Dirección de correo del remitente
        to, // Dirección de correo del destinatario
        subject, // Asunto del correo
        html, // Contenido del correo en formato HTML
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info);
      return info;
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw error;
    }
  }
}
