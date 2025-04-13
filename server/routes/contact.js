const express = require("express");
const { transporter } = require("../resources/config");
const e = require("express");
const router = express.Router();

router.post('/contact', async (req, res) => {
  
  const {name, email, message} = req.body

  if(!name || !email || !message){
    return res.status(400).json({error: "Please enter name, email, and message."})
  }

  const mailOptions = {
    from: email,
    to: process.env.ADMIN_EMAIL, 
    subject: `NEW INQUIRY FROM ${name}`, 
    text: 
    ` 
    Name: ${name}
    Email: ${email}

    Message: 

    ${message}

    `
  };

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({message: "Message sent successfully"})
  } catch(error){
    console.error("Failed to send email due to: ", error)
    res.status(500).json({error: "Failed to send message."})
  }



})

module.exports = router