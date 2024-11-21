import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
const baseDir = process.env.NODE_ENV === 'production' ? path.join(process.cwd(), 'dist') : path.join(process.cwd(), 'src');
const header = fs.readFileSync(path.join(baseDir, './assets/template/header.html'), 'utf-8').toString();
const footer = fs.readFileSync(path.join(baseDir, './assets/template/footer.html'), 'utf-8').toString();
import { config } from 'src/config/config';
import { SESClient, ListIdentitiesCommand, SendEmailRequest, SendEmailCommand } from "@aws-sdk/client-ses";


@Injectable()
export class EmailService {
    private readonly sesClient: SESClient;
    constructor(
    ) {
        this.sesClient = new SESClient({
            region: process.env.AWS_REGION_NORTH,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    async sendEmail(to: any, subject: string, content: string) {
        let html = header + content + footer;
        try {
            const params = {
                Destination: {
                    ToAddresses: [to],
                },
                Message: {
                    Body: {
                        Html: { Data: html },
                    },
                    Subject: { Data: subject },
                },
                Source: config.sourceEmail,
            };
            const command = new SendEmailCommand(params);
            const data = await this.sesClient.send(command);
            return data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}
