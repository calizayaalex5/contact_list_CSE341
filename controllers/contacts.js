const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (req, res) => {
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


module.exports = {
    getAll,
    getSingle
};