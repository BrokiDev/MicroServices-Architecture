import express from 'express';
import cors from 'cors';
import axios from 'axios';

interface PostI {
    [key:string]:any
}


const app = express();

const handleEvents = (type:string,data:any) => {
    if(type === 'PostCreated') {
        const {id,title} = data;
        idPost = id;

        posts[id] = {id,title,comments:[]};
    }
    if(type === 'CommentCreated') {
        const values = Object.keys(data).flatMap(key => data[key]);
        values.map((value:any) => {
            valueStored.push(value);
            posts[value.postId]?.comments?.push({id:value.id,content:value.content,status:value.status});
        })
    }

    if(type === 'CommentUpdated') {
        const {id,status,postId,content} = data;

        const post = posts[postId]
        const comment = post.comments.find((comment:{id:string}) => {
            return comment.id === id
        } )
        comment.status = status;
    }
}


const PORT = 3002


app.use(express.json());
app.use(cors());

const posts:PostI = {};
let idPost:string; 
const valueStored:any = [];

app.get('/values',(req,res) => {
    res.send(valueStored);
})

app.get('/posts',(req,res) => {
    res.send(posts);
});
app.post('/events',(req,res)=> {
    const {type,data} = req.body;
    handleEvents(type,data);

    res.send({});
})




app.listen(PORT,async () => {
    console.log(`Listening on http://localhost:${PORT}`)

    const res = await axios.get('http://localhost:3005/events');

    for (let event of res.data) {
        console.log('Processing Event:',event.type);

        handleEvents(event.type,event.data)
    }
})