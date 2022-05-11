const io = require('socket.io')(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
});

let users = [];
let userFriends = [];

const addUser = (userId, socketId) =>{
    !users.some((user) => user.userId === userId) && users.push({userId, socketId});
}
const addUserFriend = (friendId, socketId)=>{
    !userFriends.some((userf)=> userf.friendId === friendId) && userFriends.push({friendId,socketId});
}

const removeUser = (socketId) =>{
    users = users.filter((user)=> user.socketId !== socketId);
}

const getUser = (userId) => {
    let user =  users.find((user)=> user.userId === userId);
    if(user===undefined){
        user = userFriends.find((userf)=> userf.friendId === userId);
    }
    console.log(users);
    console.log(userFriends);
    return user;
}

io.on('connection', (socket)=>{
    console.log('a user connected');
    // io.emit('welcome','hello this is socket server');

    //take userId and socketId from user
    socket.on('addUser', (userId)=>{
        addUser(userId,socket.id);
        io.emit('getUsers', users);
    });
    socket.on('addUserFriends',(friendId)=>{
        addUserFriend(friendId,socket.id);
        // io.emit('getUserFriends',userFriends);
    })

    //send and get message
    socket.on('sendMessage',({senderId, recieverId, text})=>{
        console.log('came inside');
        const user = getUser(recieverId);
        // if(user!=undefined){  // bcz we can send message to those who are online bcz we are maintaing only online users in "users" list. so we cant get offline users.
            io.to(user.socketId).emit('getMessage',{
                senderId,
                text
            });
        // }
    });

    //when disconnect
    socket.on('disconnect',()=>{
        console.log('a user disconnected!');
        removeUser(socket.id);
        io.emit('getUsers',users);
    })
})