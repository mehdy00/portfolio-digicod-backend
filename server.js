require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { fullName, email, message } = req.body;

    // Configurez votre transporteur de mail en utilisant les variables d'environnement
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: 'contact@digicod-agency.fr',
        subject: `Demande de contact de : ${fullName}`,  // Optionally include the sender's name in the subject
        text: `Nom complet: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
        res.status(200).send({ success: true, message: 'Email sent successfully!' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
