import Contact from '../Models/Contact.js';

const createContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    const contact = await newContact.save();

    res.status(201).json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export default createContact;
