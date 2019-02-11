"use strict";
import nodemailer from 'nodemailer';
import striptags from 'striptags';

export async function run(type, widget, json) {
    return new Promise(function (resolve, reject) {

        let to = json.to ? json.to : json.data.to;
        let html = json.html ? json.html : json.data.html;
        let subject = json.subject ? json.subject : json.data.subject;
        if (to == null || html == null || subject == null) {
            return reject('Mail: Some params in bundle are missing.');
        }

        let text = striptags(json.html);
        let user = "poubelleapipoubelle@gmail.com";
        let pass = "88KVueuWJ7juyDU";
        let from = `"📧 AREA 📧" <${user}>`;

        let transporter = nodemailer.createTransport({
            Service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: user, // generated ethereal user
                pass: pass // generated ethereal password
            }
        });

        let mailOptions = {
            from: from, // sender address
            to: to.toString(), // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html // html body
        };

        // send mail with defined transport object
        /*console.log(mailOptions);*/
        transporter.sendMail(mailOptions, (err, result) => { // catch invalid email
            if (err) {
                console.log(err);
                console.log('Email non envoyé');
                reject(err);
            }
            resolve('OK');
        });
    });
}

export async function update() {

}

export function getSchema() {
    return {
        action: {},
        reaction: {
            sendEmail: {
                description: 'Send an email',
                schema: {
                    subject: typeof "",
                    html: typeof "",
                    to: typeof [],
                },
            }
        },
    }
}