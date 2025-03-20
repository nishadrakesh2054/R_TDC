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
  sports,
  category,
  time
) => {
//   const mailOptions = {
//     from: `"THUNDERBOLTS" <${process.env.EMAIL_USER}>`,
//     to: recipientEmail,
//     subject: "Registration Successful - Thunderbolts Development Center",
//     html: `
//         <html>
//           <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
//             <div style="max-width:600px; margin:20px auto; background-color:#ffffff; padding:20px; border:1px solid #ddd; border-radius:8px;">
//               <h2 style="color:#007BFF; text-align:center;">Payment Confirmation</h2>
//               <p>Dear <strong>${participantName}</strong>,</p>
//               <p>We are pleased to confirm that your payment of <strong>NPR ${amount}</strong> for the <strong>THUNDERBOLTS DEVELOPMENT CENTER</strong> has been successfully processed.</p>
//               <p>Your registration details are as follows:</p>
//               <table style="width:100%; border-collapse:collapse; margin:20px 0;">
//                 <tr>
//                   <td style="border:1px solid #ddd; padding:8px;"><strong>Sport</strong></td>
//                   <td style="border:1px solid #ddd; padding:8px;">${sports}</td>
//                 </tr>
//                 <tr>
//                   <td style="border:1px solid #ddd; padding:8px;"><strong>Category</strong></td>
//                   <td style="border:1px solid #ddd; padding:8px;">${category}</td>
//                 </tr>
//                    <tr>
//                   <td style="border:1px solid #ddd; padding:8px;"><strong>Time</strong></td>
//                   <td style="border:1px solid #ddd; padding:8px;">${time}</td>
//                 </tr>
              
//               </table>
//               <p>Thank you for completing your payment. We look forward to your participation in the event.</p>
//               <div style="text-align:center; margin:20px 0;">
//                 <a href="https://thunderbolts.com.np/" style="background-color:#007BFF; color:#fff; padding:10px 20px; text-decoration:none; border-radius:5px;">Visit Our Website</a>
//               </div>
//               <p style="text-align:center; font-size:14px; color:#777; margin-top:30px;">
//                 Best regards,<br>
//                 <strong>Sports & Curricular Activities Department</strong><br>
//                 GEMS School<br>
//                 Dhapakhel, Lalitpur
//               </p>
//             </div>
//           </body>
//         </html>
//       `,
//   };

const mailOptions = {
    from: `"THUNDERBOLTS" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: "Registration Successful for Thunderbolts Development Center",
    html: `
        <html>
          <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <div style="max-width:600px; margin:20px auto; background-color:#ffffff; padding:20px; border:1px solid #ddd; border-radius:8px;">
              <h2 style="color:#007BFF; text-align:center;">Registration Successful</h2>
              <p>Dear <strong>${participantName}</strong>,</p>
              <p>Congratulations on successfully registering for the <strong>${sports}</strong> Program at <strong>Thunderbolts Development Center</strong>! We are thrilled to welcome you to our <strong>${category}</strong> level and are excited to have you join our growing community of passionate ${sports} enthusiasts.</p>
              <p>We are pleased to confirm that your payment of <strong>NPR ${amount}</strong> has been successfully processed and received. Thank you for completing your registration!</p>
              <p>Your journey with Thunderbolts Development Center is about to begin, and we are committed to providing you with the best training, guidance, and support to help you grow both on and off the field.</p>
              <p>Here are  Your registration details:</p>
              <table style="width:100%; border-collapse:collapse; margin:20px 0;">
                <tr>
                  <td style="border:1px solid #ddd; padding:8px;"><strong>Full Name</strong></td>
                  <td style="border:1px solid #ddd; padding:8px;">${participantName}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #ddd; padding:8px;"><strong>Sport</strong></td>
                  <td style="border:1px solid #ddd; padding:8px;">${sports}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #ddd; padding:8px;"><strong>Category</strong></td>
                  <td style="border:1px solid #ddd; padding:8px;">${category}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #ddd; padding:8px;"><strong>Time</strong></td>
                  <td style="border:1px solid #ddd; padding:8px;">${time}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #ddd; padding:8px;"><strong>Days</strong></td>
                  <td style="border:1px solid #ddd; padding:8px;">Grassroots:Tuesday & Thursday , Intermediate or Senior:'Monday, Wednesday & Friday'}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #ddd; padding:8px;"><strong>Location</strong></td>
                  <td style="border:1px solid #ddd; padding:8px;">Dhapakhel, Lalitpur</td>
                </tr>
              </table>
              <p>If you have any questions or need further assistance, feel free to reach out. Once again, welcome to the Thunderbolts family! We can’t wait to see you on the field and help you achieve your goals.</p>
              <div style="text-align:center; margin:20px 0;">
                <a href="https://thunderbolts.com.np/" style="background-color:#007BFF; color:#fff; padding:10px 20px; text-decoration:none; border-radius:5px;">Visit Our Website</a>
              </div>
              <p style="text-align:center; font-size:14px; color:#777; margin-top:30px;">
                Best regards,<br>
                <strong>Thunderbolts Development Center</strong><br>
                Dhapakhel, Lalitpur.<br>
                Contact:<br>
                Tel: +977 9801973975/67<br>
                Email: info@thunderbolts.com.np
              </p>
               <p style="text-align:center; font-size:14px; color:#777;">For more updates and news, follow us on:</p>
            <p style="text-align:center;">
              <a href="https://thunderbolts.com.np/" style="text-decoration:none; margin-right:10px;">
                <img src="https://img.icons8.com/ios-filled/50/000000/domain.png" alt="Website" width="20" height="20"/> thunderbolts.com.np
              </a> 
              | 
              <a href="https://www.instagram.com/thunderboltsdc" style="text-decoration:none; margin-left:10px;">
                <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" width="20" height="20"/> thunderboltsdc
              </a>
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
