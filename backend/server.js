import { Server } from "socket.io";



const PORT = 9000;
const io = new Server(PORT,{
    cors:{
        origin:"http://localhost:5173",
        methods:[ 'GET', 'POST' ],
    }
})


io.on('connection', socket =>{
    socket.on('send-changes', delta =>{
        // send to all clients except
        socket.broadcast.emit( 'receive-changes', delta); 
        

    })
})


// io.on('connection',socket =>{

//     socket.on('send-changes',delta =>{

//         console.log(delta)
//     })

// })