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


async function run(json) {
    let obj2 =
        {
            subject: "Epitech c'est nul",
            html: '<div style="margin-left:auto;margin-right:auto;width:50%;"><img class="logo" alt="mdr" src="http://www.fourfrontgroup.co.uk/assets/uploads/images/Area_Primary_Logo_rgb_1.png"/><div><p style="text-align:center;"><a style="color:#282c34;font-size:20px;" href="#">Confirm your account</a></p></div></div>',
            to: ["poubelleapipoubelle@gmail.com", "poubelleapipoubelle@gmail.com"],
        };
    json = JSON.stringify(obj2);

    if (!compare(json, schema)) {
        return;
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
    console.log(mailOptions);
//    return;
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
}

run().catch(console.error);