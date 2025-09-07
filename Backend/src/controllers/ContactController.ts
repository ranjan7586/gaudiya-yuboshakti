import { Request, Response } from "express";
import ContactService from "../services/ContactService";
import { contactAdminEmail } from "../templates/contactAdminEmail";
import { contactUserEmail } from "../templates/contactUserEmail";
import nodemailer from 'nodemailer';

class ContactController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Name, email, and message are required." });
      }

      // Save to DB
      const contact = await ContactService.createContact({ name, email, subject, message });
      console.log(contact)

      // Setup mail transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Send mail to Admin
      await transporter.sendMail({
        from: `"Gaudiya Yuboshakti" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Message from ${name}`,
        html: contactAdminEmail({ name, email, subject, message }),
      });

      // Send mail to User
      await transporter.sendMail({
        from: `"Gaudiya Yuboshakti" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thank you for contacting Gaudiya Yuboshakti",
        html: contactUserEmail({ name }),
      });

      return res.status(201).json({ success: true, message: "Message sent successfully", data: contact });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  }
}

export default new ContactController();
