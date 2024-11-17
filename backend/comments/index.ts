import express from "express"
import {randomBytes} from 'crypto'
import cors from 'cors'
import axios from "axios";

interface IComments {
    [key:string] : any;
}


const PORT = 3001;
const app = express();


const commentsByPostId:IComments = {};
let dataObj:IComments = {};

app.use(express.json());
app.use(cors());



app.get('/posts/:id/comments', (req,res) => {
    res.status(200).json({
        status:'success',
        message:'Data Retrieved successfully',
        data:commentsByPostId[req.params.id] || []
    })
})

app.post('/posts/:id/comments', async(req,res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content,postId:req.params.id,status:'pending' });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:3005/events',{
        type:'CommentCreated',
        data: commentsByPostId
    })
    res.status(201).json({
        status:'success',
        message:'comment created successfully',
        data:comments
    })
})

app.post('/events',async (req,res) => {
    const {type,data} = req.body
    console.log('Event Received:',req.body.type);

    if(type === 'CommentModerated') {
        const CommentMapped = data.flatMap((item:any) => {
            const {postId,id,status,content} = item;
            dataObj = {
                id,postId,status,content
            }
        })
        const {id,postId,status,content} = dataObj;

        const comments = commentsByPostId[postId];
        const comment = comments?.find((comment:{id:string}) => {
            return comment.id === id;
        })

        comment.status = status;
        console.log({status,postId,id,content})

        await axios.post('http://event-bus-srv:3005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }

        })
    }

    res.send({});

})



app.listen(PORT,() => {
    console.log(`Listening on PORT ${PORT}`);
})
