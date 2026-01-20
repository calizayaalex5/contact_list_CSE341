const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (req, res) => {
    //swagger.tags=['contacts']
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .find();

    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    //swagger.tags=['contacts']
    try {   
        if (!req.params || !req.params.id) {
            return res.status(400).json({ message: "Contact id is required" });
        }

        const contactId = req.params.id;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ message: "Invalid contact id format" });
        }

        const userId = new ObjectId(contactId)

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .find({ _id: userId });
        
        const contacts = await result.toArray();

        if (!contacts[0]) {
            return res.status(404).json({ message: 'Contact not found'})
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    } catch (error) {
        res.status(500).json({ message: error.message})
    };
};

const addContact = async (req, res) => {
    //swagger.tags=['contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .insertOne(contact);

    if (response.acknowledged) {
        res.status(201).send();
    } else {
        res.status(500).json(response.error) || 'Some error acurred while updating the user';
    }
};

const editContact = async (req, res) => {
    //swagger.tags=['contacts']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid contact id format' });
    }
    const contactId = new ObjectId(req.params.id)
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json(response.error) || 'Contact not Found' ;
    }
};

const deleteContact = async (req, res) => {
    //swagger.tags=['contacts']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid contact id format' });
    }
    
    const contactId = new ObjectId(req.params.id)
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json(response.error) || 'Contact not Found';
    }
};

module.exports = {
    getAll,
    getSingle,
    addContact,
    editContact,
    deleteContact
};