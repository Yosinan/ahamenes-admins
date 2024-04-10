const nodemailer = require("nodemailer");
const Comment = require("../models/commentModel");

const { EMAIL_PASS, EMAIL_ADDRESS } = require("../config");


// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASS,
    },
});

const sendEmail = async (req, res) => {
    const { subject, message, email, senderName } = req.body;

    if (!subject || !message || !email) {
        return res
            .status(400)
            .json({ error: "Subject, message, and email are required" });
    }

    // save comment/feedback to database
    const comment = new Comment({
        subject,
        message,
        email,
        senderName
    });

    try {
        await comment.save();

        
        const htmlEmailTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Message Received</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #333;
        }

        .message-details {
            margin-top: 20px;
        }

        .message-details p {
            margin: 5px 0;
        }

        .response-instruction {
            margin-top: 20px;
            font-style: italic;
        }

        .response-instruction p {
            margin: 5px 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>New message received from:</h2>
        <div class="message-details">
            ${senderName ? `<p><strong>Name:</strong> ${senderName}</p>` : ''}
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
        </div>
        <div class="response-instruction">
            <p>To respond, simply reply to this message.</p>
        </div>
    </div>
</body>

</html> `;

        const mailOptions = {
            from: '',
            to: 'ymymym4634@gmail.com',   // replace this with ahamenes' email address
            subject: subject,
            html: htmlEmailTemplate,
            replyTo: email, // this ensures replies are sent to the original sender's email address
        };

        const confirmationOptions = {
            from: ' ',  // ahamenes' email address
            to: email,
            subject: "Your Comment Has Been Received",
            html: `
    <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title></title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
    <!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
    <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100% !important;
            }
        }
    </style>
    <style type="text/css">
    </style>
</head>

<body style="background-color:#f9f9f9;">
    <div style="background-color:#f9f9f9;">
        <!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                <tbody>
                    <tr>
                        <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                <tbody>
                    <tr>
                        <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">

        <tr>

            <td style="vertical-align:bottom;width:600px;">
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="width:64px;">
                                                            <img height="auto" src="https://imgur.com/0j8UB8h.png" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="64" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                Welcome to Ahamenes Space Club
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                Dear Space Voyager,<br><br>
                                                Thank you for reaching out to us. Your feedback is greatly appreciated.<br>
                                                We're pleased to confirm that we have received your message and are grateful for your input. <br> <br> Please click the link below to join Ahamenes Space Club Telegram Channel.
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                <tr>
                                                    <td align="center" bgcolor="#2F67F6" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 25px;" valign="middle">
                                                        <p style="background:#2F67F6;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;">
                                                            <a href="https://t.me/ahamenes101" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none;">Join our Club</a>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;color:#525252;">
                                                Best regards,<br><br> Ahamenes Space Club<br>
                                                <a href="https://www.htmlemailtemplates.net" style="color:#2F67F6">Ahamenesspaceclub.com</a>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
        <div style="Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">

        <tr>

            <td style="vertical-align:bottom;width:600px;">
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                        <tr>
                                            <td style="vertical-align:bottom;padding:0;">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                    <tr>
                                                        <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                Addis Ababa Science Technology University, Ethiopia
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
                                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;"></div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>

  `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ error: "Error sending email" });
            }
            console.log("Email sent:", info.response);
            res
                .status(200)
                .json({ message: "Email sent successfully to Ahamenes Space Club." });

            // Sending confirmation email to the user
            transporter.sendMail(confirmationOptions, (error, info) => {
                if (error) {
                    console.error("Error sending confirmation email:", error);
                    return;
                }
                console.log("Confirmation Email sent:", info.response);
            });
        });

    } catch (err) {
        console.error("Error saving comment to database:", err);
        return res.status(500).json({ error: "Error saving comment to database" });
    }
};

module.exports = { sendEmail };