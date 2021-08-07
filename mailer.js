
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport')


async function ebook(recipient) {
    let transporter = nodemailer.createTransport(smtpTransport({
        host: "webmail.softnoonng.com",
        tls:{
            rejectUnauthorized: false
        },
        port: 587,
        secure: false,
        auth: {
            user: 'collinswilson@softnoonng.com',
            pass: process.env.MAIL_PASSWORD || 'Newaccess@21'
        },
    }));

    let info = await transporter.sendMail({
        from: '"Hilton Parker Services" <collinswilson@softnoonng.com>',
        to: recipient,
        subject:`New Application`,
        body: `bbb`
    });
    // let transporter = nodemailer.createTransport(smtpTransport({
    //     host: "mail.twinkleandblink.com",
    //     tls:{
    //         rejectUnauthorized: false
    //     },
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: 'noreply@twinkleandblink.com', 
    //         pass: '7#MH4)x.Fy=Q'
    //     },
    // }));

    // let info = await transporter.sendMail({
    //     from: '"Twinkle & Blink" <noreply@twinkleandblink.com>',
    //     to: recipient,
    //     subject:`Free Ebook`,
    //     html: `
    //         <p>Click to get your copy of the ebook</p>
    //         <a href="#"><button>Get E-bool</button></a>
    //         <p>Copy the link in your browser if the button is not visible</p>
    //         <p>Link</p>
    //     `
    // });

} 

module.exports = ebook