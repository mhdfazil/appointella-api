import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    
  constructor(private readonly mailerService: MailerService) {}

    public example(): void {
        this
        .mailerService
        .sendMail({
            to: 'test@nestjs.com', // list of receivers
            from: 'noreply@nestjs.com', // sender address
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
        })
        .then((success) => {
            console.log(success)
        })
        .catch((err) => {
            console.log(err)
        });
    }
    
    public verify(link: string, email: string): void {
        this
        .mailerService
        .sendMail({
            to: email,
            from: 'appointella@gmail.com',
            subject: 'Welcome to Appointella',
            template: 'verify',
            context: { link },
        })
        .then((success) => {
            console.log(success)
        })
        .catch((err) => {
            console.log(err)
        });
    }
    
    public resetPassword(link: string, email: string, image: string): void {
        this
        .mailerService
        .sendMail({
            to: email,
            from: 'appointella@gmail.com',
            subject: 'Reset Password - Appointella',
            template: 'reset-pwd',
            context: { link, image },
        })
        .then((success) => {
            console.log(success)
        })
        .catch((err) => {
            console.log(err)
        });
    }
    
    public example2(): void {
        this
        .mailerService
        .sendMail({
            to: 'mhdfazil79@gmail.com',
            from: 'appointella@gmail.com',
            subject: 'Testing Nest Mailermodule with template ✔',
            template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
            context: {  // Data to be sent to template engine.
                code: 'cf1a3f828287',
                username: 'john doe',
            },
        })
        .then((success) => {
            console.log(success)
        })
        .catch((err) => {
            console.log(err)
        });
    }
    
    public example3(): void {
        this
        .mailerService
        .sendMail({
            to: 'test@nestjs.com',
            from: 'noreply@nestjs.com',
            subject: 'Testing Nest Mailermodule with template ✔',
            template: '/index', // The `.pug` or `.hbs` extension is appended automatically.
            context: {  // Data to be sent to template engine.
                code: 'cf1a3f828287',
                username: 'john doe',
            },
        })
        .then((success) => {
            console.log(success)
        })
        .catch((err) => {
            console.log(err)
        });
    }

}