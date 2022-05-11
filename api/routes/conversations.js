const router = require('express').Router();
const Conversation = require('../models/Conversation');

//save conversation
router.post('/', async (req,res)=>{
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId]
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get conv of a user
router.get('/:userId', async (req,res)=>{
    try {
        const conversation = await Conversation.find({
            members:{$in: [req.params.userId]}
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get conv includes 2 user id
router.get('/find/:firstUserId/:secondUserId', async (req,res)=>{
    try {
        const conversation = await Conversation.findOne({
            members: {$all : [req.params.firstUserId, req.params.secondUserId]}
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

//delete conversation
router.delete('/delete/:senderId/:recieverId', async (req,res)=>{
    try {
        await Conversation.findOneAndDelete({
            members:{$all :[req.params.senderId, req.params.recieverId]}
        });
        res.status(200).json();
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;