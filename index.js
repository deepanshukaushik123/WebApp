const express = require('express')
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express()
const port = 4000
const encoder = new bodyParser.urlencoded()
const transporter = new nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    tls: true,
    auth: {
        user: "deepanshukaushik4721@gmail.com",
        pass: "fijuqlghhfcmzpxf"
    }
})

app.set("view engine", "hbs")
app.use(express.static("./views/public"))
hbs.registerPartials(path.join(__dirname, "./views/partials"))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' })
})

app.get('/appointment', (req, res) => {
    res.render('appointment', { title: 'Appointment', show: false  })
})

app.post('/appointment', encoder, (req, res) => {
    const selectedService = req.body.service;
    let mailOptions = {
        from: "deepanshukaushik4721@gmail.com",
        to: req.body.email,
        subject: "Your Appointment Received",
        text: `
                Hello ${req.body.name}
                Your Appointment Has Been Received
                Our Team Will Contact You Soon!!!
                Team: LabSky
        `
    }
    transporter.sendMail(mailOptions, (error) => {
        console.log(error);
    })

    mailOptions = {
        from: "deepanshukaushik4721@gmail.com",
        to: "deepanshukaushik4721@gmail.com",
        subject: "New Appointment Received",
        html: `
               New Appointment Received
               <table border="2px" cellpadding="10px" cellspacing="0">
                 <tbody>
                    <tr>
                      <th>Name</th>
                      <td>${req.body.name}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>${req.body.phone}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>${req.body.email}</td>
                    </tr>
                    <tr>
                      <th>Service</th>
                      <td>${selectedService}</td>
                    </tr>
                    <tr>
                      <th>Message</th>
                      <td>${req.body.message}</td>
                    </tr>
               </tbody>
               </table>
        `
    }
    transporter.sendMail(mailOptions, (error) => {
        console.log(error);
    })
    res.render('appointment', { title: 'Appointment', show: true  })
})

app.get('/contact-us', (req, res) => {
    res.render('contact', { title: 'Contact-Us', show: false })
})

app.post('/contact-us', encoder, (req, res) => {
    console.log(req.body);
    let mailOptions = {
        from: "deepanshukaushik4721@gmail.com",
        to: req.body.email,
        subject: "Your Query Received",
        text: `
                Hello ${req.body.name}
                Your Query Has Been Received
                Our Team Will Contact You Soon!!!
                Team: LabSky
        `
    }
    transporter.sendMail(mailOptions, (error) => {
        console.log(error);
    })

    mailOptions = {
        from: "deepanshukaushik4721@gmail.com",
        to: "deepanshukaushik4721@gmail.com",
        subject: "New Query Received",
        html: `
               New Query Received
               <table border="2px" cellpadding="10px" cellspacing="0">
                 <tbody>
                    <tr>
                      <th>Name</th>
                      <td>${req.body.name}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>${req.body.phone}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>${req.body.email}</td>
                    </tr>
                    <tr>
                      <th>Subject</th>
                      <td>${req.body.subject}</td>
                    </tr>
                    <tr>
                      <th>Message</th>
                      <td>${req.body.message}</td>
                    </tr>
               </tbody>
               </table>
        `
    }
    transporter.sendMail(mailOptions, (error) => {
        console.log(error);
    })
    res.render('contact', { title: 'Contact-Us', show: true })
})

app.get('/feature', (req, res) => {
    res.render('feature', { title: 'Features' })
})

app.get('/service', (req, res) => {
    res.render('service', { title: 'Service' })
})

app.get('/team', (req, res) => {
    res.render('team', { title: 'Team' })
})

app.get('/testimonial', (req, res) => {
    res.render('testimonial', { title: 'Testimonial' })
})

app.get('/*', (req, res) => {
    res.render('404', { title: '404' })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))