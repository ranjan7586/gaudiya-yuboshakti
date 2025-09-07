export const contactAdminEmail = (data: { name: string; email: string; subject?: string; message: string }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Contact Message - Gaudiya Yuboshakti</title>
</head>
<body style="font-family: Arial, sans-serif; background-color:#fff; padding:20px; color:#000;">
  <table width="100%" style="max-width:600px; margin:auto; border:1px solid #eee; border-radius:8px; overflow:hidden;">
    <tr style="background:#ff6600; color:#fff;">
      <td style="padding:20px; text-align:center; font-size:20px; font-weight:bold;">
        New Contact Message
      </td>
    </tr>
    <tr>
      <td style="padding:20px;">
        <p style="font-size:16px;">Hello Admin,</p>
        <p>You have received a new contact message from <b>${data.name}</b>.</p>
        <p><b>Email:</b> ${data.email}</p>
        ${data.subject ? `<p><b>Subject:</b> ${data.subject}</p>` : ""}
        <p><b>Message:</b></p>
        <blockquote style="border-left:4px solid #ff6600; padding-left:10px; color:#555;">
          ${data.message}
        </blockquote>
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
