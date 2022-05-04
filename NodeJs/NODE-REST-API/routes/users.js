const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//update user
router.put('/:id', async (req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin ){  
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.json('Account has been Updated')
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("You can update only your account!")
    }
});

//delete user
router.delete('/:id', async (req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin ){  
        try {
            await User.findByIdAndDelete({"_id":req.params.id});
            res.json('Account has been Deleted')
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("You can update only your account!")
    }
});

//get a user
router.get('/:id', async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...others} = user._doc;
        res.json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

//follow a user
router.put('/:id/follow', async (req,res)=>{
    if(req.body.userId !==req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userId}});
                await currentUser.updateOne({ $push: {followings: req.params.id}});
                res.status(200).json('user has been followed');
            }else{
                res.status(403).json('you already follow this user');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json('Cannot follow yourself!')
    }
});

//unfollow a user
router.put('/:id/unfollow', async (req,res)=>{
    if(req.body.userId !==req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userId}});
                await currentUser.updateOne({ $pull: {followings: req.params.id}});
                res.status(200).json('user has been unfollowed');
            }else{
                res.status(403).json('you are not following this user');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json('Cannot unfollow yourself!')
    }
});


module.exports = router;