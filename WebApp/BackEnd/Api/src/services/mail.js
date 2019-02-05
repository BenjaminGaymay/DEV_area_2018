"use strict";
import nodemailer from 'nodemailer';
import striptags from 'striptags';
import {jsonCompare as compare} from "../jsonSchemaCompare";

const schemaMail = {
    subject: "",
    html: "",
    to: [],
};

const schema = JSON.stringify(schemaMail);

export async function run(type, widget, json) {
    return new Promise(function (resolve, reject) {
        let tmp = json;
        if (typeof json !== "string") {
            tmp = JSON.stringify(json);
        }

        if (!compare(tmp, schema)) {
            return reject('Mail: Some params in bundle are missing.');
        }

        let text = striptags(json.html);
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
            to: json.to.toString(), // list of receivers
            subject: json.subject, // Subject line
            text: text, // plain text body
            html: json.html // html body
        };

        // send mail with defined transport object
        /*console.log(mailOptions);*/
        transporter.sendMail(mailOptions, (err, result) => { // catch invalid email
        });
    });
}

export async function update(widget) {

}