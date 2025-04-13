require('dotenv').config()
const mailer = require('nodemailer')

const transporter = mailer.createTransport({
  service: 'Gmail', 
  auth : {
    user : process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD
  }
})

module.exports = {transporter}