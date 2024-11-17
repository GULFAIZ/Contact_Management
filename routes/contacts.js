const express = require('express');
const Contact = require('../models/contact');

const router = express.Router();

// Add a new contact
router.post('/', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  if (!firstName || !lastName || !email || !phoneNumber) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  try {
    const existingContact = await Contact.findOne({ email });
    if (existingContact) return res.status(400).json({ message: 'Email already exists.' });

    const contact = new Contact({ firstName, lastName, email, phoneNumber, company, jobTitle });
    await contact.save();
    res.status(201).json({ message: 'Contact added successfully!', contact });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add contact.', error: error.message });
  }
});

// Get all contacts
router.get('/', async (req, res) => {
   
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contacts.', error: error.message });
  }
});

// Update a contact
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phoneNumber, company, jobTitle },
      { new: true, runValidators: true }
    );
    if (!updatedContact) return res.status(404).json({ message: 'Contact not found.' });
    res.status(200).json({ message: 'Contact updated successfully!', contact: updatedContact });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contact.', error: error.message });
  }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) return res.status(404).json({ message: 'Contact not found.' });
    res.status(200).json({ message: 'Contact deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact.', error: error.message });
  }
});

module.exports = router;
