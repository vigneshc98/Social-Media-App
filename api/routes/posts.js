const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

//CREATE A POST 
router.post('/', async (req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

//UPDATE A POST
router.put('/:id', async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            res.json('the post has been updated')
        }else{
            res.status(403).json('you can update only your posts')
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//DELETE A POST
router.delete('/:id', async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.deleteOne();
            res.json('the post has been deleted')
        }else{
            res.status(403).json('you can delete only your posts')
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//LIKE or DISLIKE A POST
router.put('/:id/like', async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.json('the post has been liked');
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.json('the post has been disliked');
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET A POST
router.get('/:id', async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET TIMELINE POSTS
router.get('/timeline/:userId', async (req,res)=>{
    try {
        const currentUser = await User.findById(req.params.userId);
        const currentUserPosts = await Post.find({"userId":req.params.userId});
        const friendsPost = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId:friendId});
            })
        );
        res.json(currentUserPosts.concat(...friendsPost))
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET TIMELINE POSTS
router.get('/profile/:username', async (req,res)=>{
    try {
        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find({"userId": user._id});
        res.json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;