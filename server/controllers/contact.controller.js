const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const email = req.body.email;
  const name = req.body.name;
  const message = req.body.message;
  console.log(message);

  if (!email || !name || !message) {
    res.end(
      JSON.stringify(
        { error: "Please fill in the required information." },
        null,
        4
      )
    );
  } else {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "studentspark@stup.id",
        pass: "iummyssljiwefrus",
      },
    });
    const mailOptions = {
      from: "studentspark@stup.id",
      to: "studentspark@stup.id",
      subject: "New message from user!",
      text: `From: ${email} \n Name: ${name} \n Message: ${message}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.end(JSON.stringify({ error: "Unable to send email" }, null, 4));
      } else {
        res.end(JSON.stringify({ success: "Sent Email" }, null, 4));
      }
    });
  }
};
