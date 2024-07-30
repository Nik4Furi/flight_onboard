const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        

    },
});

exports.sendEmail = (recipient, subject, message) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: recipient,
        subject,
        text: message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        console.log('info and err ',err,info);
        
        if (err) {
            console.error('Email send error:', err);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
