const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//REGISTER
router.post('/register', async (req,res)=>{
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            "username":req.body.username,
            "email":req.body.email,
            "password":hashedPassword
        });
        const user = await newUser.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

//LOGIN
router.post('/login', async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json('user not found!');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json('wrong password');

        res.json(user);

    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;