"use strict";
import nodemailer from 'nodemailer';
import striptags from 'striptags';

export async function run(datas) {
    return new Promise(function (resolve, reject) {
        if (!datas.hasOwnProperty("to") || !datas.hasOwnProperty("html") || !datas.hasOwnProperty("subject")) {
            return reject('Mail: Some params in bundle are missing.');
        }

        let text = striptags(datas.html);
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
            to: datas.to.toString(), // list of receivers
            subject: datas.subject, // Subject line
            text: text, // plain text body
            html: datas.html // html body
        };

        transporter.sendMail(mailOptions, (err, result) => { // catch invalid email
            if (err) {
                console.log(err);
                console.log('Email non envoyé');
                return reject(err);
            }
            return resolve('OK');
        });
    });
}

export async function update() {
    return 'OK';
}