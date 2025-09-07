import Contact, { IContact } from "../models/Contact";

class ContactService {
  async createContact(data: Partial<IContact>) {
    const contact = new Contact(data);
    return await contact.save();
  }

  async listContacts() {
    return await Contact.find().sort({ createdAt: -1 });
  }
}

export default new ContactService();
