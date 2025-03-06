import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.stackmail.com",
  port: 465,
  secure: true,
  pool: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export const sendPaymentConfirmationEmail = async (
  recipientEmail,
  participantName,
  amount,
  clientContact,
  sports,
  category
) => {
  const mailOptions = {
    from: `"THUNDERBOLTS" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: "Payment Confirmation - THUNDERBOLTS DEVELOPMENT CENTER",
    html: `
        <html>
          <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <div style="max-width:600px; margin:20px auto; background-color:#ffffff; padding:20px; border:1px solid #ddd; border-radius:8px;">
              <h2 style="color:#007BFF; text-align:center;">Payment Confirmation</h2>
              <p>Dear <strong>${participantName}</strong>,</p>
              <p>We are pleased to confirm that your payment of <strong>NPR ${amount}</strong> for the <strong>THUNDERBOLTS DEVELOPMENT CENTER</strong> has been successfully processed.</p>
              <p>Your registration details are as follows:</p>
              <table style="width:100%; border-collapse:collapse; margin:20px 0;">
                <tr>
                  <td style="border:1px solid #ddd; padding:8px;"><strong>Sport</strong></td>
                  <td style="border:1px solid #ddd; padding:8px;">${sports}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #ddd; padding:8px;"><strong>Category</strong></td>
                  <td style="border:1px solid #ddd; padding:8px;">${category}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #ddd; padding:8px;"><strong>Contact</strong></td>
                  <td style="border:1px solid #ddd; padding:8px;">${clientContact}</td>
                </tr>
              </table>
              <p>Thank you for completing your payment. We look forward to your participation in the event.</p>
              <div style="text-align:center; margin:20px 0;">
                <a href="https://thunderbolts.com.np/" style="background-color:#007BFF; color:#fff; padding:10px 20px; text-decoration:none; border-radius:5px;">Visit Our Website</a>
              </div>
              <p style="text-align:center; font-size:14px; color:#777; margin-top:30px;">
                Best regards,<br>
                <strong>Sports & Curricular Activities Department</strong><br>
                GEMS School<br>
                Dhapakhel, Lalitpur
              </p>
            </div>
          </body>
        </html>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Payment confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending payment confirmation email:", error);
    throw new Error(
      "Failed to send payment confirmation email: " + error.message
    );
  }
};
