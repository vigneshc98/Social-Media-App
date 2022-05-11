const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const conversationRouter = require('./routes/conversations');
const messageRouter = require('./routes/messages');
const path = require('path');

dotenv.config();

mongoose.connect(process.env.MONGO_URL ,{useNewUrlParser:true, useUnifiedTopology:true},()=>{
    console.log('Connected to mongoDB');
});

var cors = require ('cors');
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}));

// app.use(function (req, res, next) {

//     res.header('Access-Control-Allow-Origin', "http://localhost:4200");
//     res.header('Access-Control-Allow-Headers', true);
//     res.header('Access-Control-Allow-Credentials', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     next();
//   });

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,req.body.path);
    },
    filename: (req,file,cb)=>{
        cb(null, req.body.name);
    }
})
const upload = multer({storage});

app.post('/api/upload', upload.single("file"), (req,res)=>{
    try {
        return res.status(200).json('file uploaded successfully');
    } catch (error) {
        res.status(500).json();
    }
});

app.use("/images", express.static(path.join(__dirname,"public/images/")));

//middleware
app.use(express.json()); //parse for post request
app.use(helmet());
app.use(morgan('common'));
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/post',postRouter);    
app.use('/api/conversation',conversationRouter);
app.use('/api/message',messageRouter);


app.listen(8800, ()=>{
    console.log('Backed server is running');
})
