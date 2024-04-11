// server.js
import { Connection } from "./database/db.js";
import { Server } from "socket.io";
import { getDocument ,updateDocument} from "./controller/documentController.js";

Connection();

const PORT = 9000;
const io = new Server(PORT,{
    cors:{
        origin:"http://localhost:5173",
        methods:[ 'GET', 'POST' ],
    }
});

io.on('connection', socket =>{
    socket.on('get-document', async docID =>{
        const document = await getDocument(docID);
        socket.join(docID);
        socket.emit('load-document', document.data);
        socket.on('send-changes', delta =>{
            socket.broadcast.to(docID).emit('receive-changes', delta); 
        });

        socket.on('save-document', async data =>{
            await updateDocument(docID, data)
    
        } )
    });

    
});
