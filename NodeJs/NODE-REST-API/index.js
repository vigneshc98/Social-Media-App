const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

dotenv.config();

mongoose.connect(process.env.MONGO_URL ,{useNewUrlParser:true, useUnifiedTopology:true},()=>{
    console.log('Connected to mongoDB');
});

//middleware
app.use(express.json()); //parse for post request
app.use(helmet());
app.use(morgan('common'));
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/post',postRouter);

app.listen(8800, ()=>{
    console.log('Backed server is running');
})
