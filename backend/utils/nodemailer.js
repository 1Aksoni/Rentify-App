import nodemailer from  'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'akshat2001soni@gmail.com',
      pass: 'iqkfmpzdnqiouvwp '
    }
  });

  const sendEmail = async (to,data) => {
    try {
      console.log("Comming");
      // Send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'akshat2001soni@gmail.com',
        to:to,
        subject: "Real Estate Property Dealing ",
        html:data,
      });
  
      console.log('Email sent: %s', info.messageId);
      return info.messageId;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  export {sendEmail}
  