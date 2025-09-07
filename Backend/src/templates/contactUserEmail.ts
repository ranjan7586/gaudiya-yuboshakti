export const contactUserEmail = (data: { name: string }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Thanks for Contacting - Gaudiya Yuboshakti</title>
</head>
<body style="font-family: Arial, sans-serif; background:#fff; padding:20px; color:#000;">
  <table width="100%" style="max-width:600px; margin:auto; border:1px solid #eee; border-radius:8px; overflow:hidden;">
    <tr style="background:#ff6600; color:#fff;">
      <td style="padding:20px; text-align:center; font-size:20px; font-weight:bold;">
        Thank You for Reaching Out
      </td>
    </tr>
    <tr>
      <td style="padding:20px;">
        <p style="font-size:16px;">Hi ${data.name},</p>
        <p>Thank you for contacting <b>Gaudiya Yuboshakti</b>. We have received your message and will respond as soon as possible.</p>
        <p>We’re happy to connect with you 🙏</p>
        <p style="margin-top:20px;">Warm regards,<br/><b>Gaudiya Yuboshakti Team</b></p>
      </td>
    </tr>
    <tr style="background:#000; color:#fff;">
      <td style="padding:15px; text-align:center; font-size:14px;">
        © ${new Date().getFullYear()} Gaudiya Yuboshakti
      </td>
    </tr>
  </table>
</body>
</html>
`;
