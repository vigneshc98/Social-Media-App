const router = require('express').Router();
const Message = require('../models/Message');

//save a message 
router.post('/', async (req,res)=>{
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json();
    }
});

//get a message
router.get('/:covnersationId', async (req,res)=>{
    try {
        const message = await Message.find({
            conversationId: req.params.covnersationId
        });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;