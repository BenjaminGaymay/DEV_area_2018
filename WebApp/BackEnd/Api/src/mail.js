"use strict";
import nodemailer from 'nodemailer';
import striptags from 'striptags';
import {jsonCompare as compare} from "./jsonSchemaCompare";

const schemaMail = {
    subject: "",
    html: "",
    to: [],
};

const schema = JSON.stringify(schemaMail);

export async function run(json) {
    return new Promise(function (resolve, reject) {

        if (!compare(json, schema)) {
            return reject('Mail: Some params in bundle are missing.');
        }

        let param = JSON.parse(json);
        param.text = striptags(param.html);

        let user = "poubelleapipoubelle@gmail.com";
        let pass = "SpTr5WhcVSjJswa";
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
            to: param.to.toString(), // list of receivers
            subject: param.subject, // Subject line
            text: param.text, // plain text body
            html: param.html // html body
        };

        // send mail with defined transport object
        /*console.log(mailOptions);*/
        transporter.sendMail(mailOptions, (err, result) => { // catch invalid email
        });
    });
}