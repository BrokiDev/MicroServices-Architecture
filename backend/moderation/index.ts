import axios from 'axios';
import express from 'express';

interface CommentsProp {
    id:string
    content:string
    postId:string
    status:string
}


const app = express();

const PORT = 3003;
app.use(express.json());
const commentModerated:CommentsProp[] =[];


app.post('/events', async (req,res) => {
    const {type,data} = req.body;

    if(type === 'CommentCreated') {
        console.log(data);
        const valuesArr: CommentsProp[] = Object.values(data).flatMap((item:any) => {
            return item;
        } )
        const filtered = valuesArr.map((item: { id: string; content: string; postId: string; status: string; }) => {
            const {id,content,postId,} = item;
            const status = item.content.includes('orange') ? 'rejected': 'approved'
            commentModerated.push({id,content,postId,status})
            return;
        })

        await axios.post('http://event-bus-srv:3005/events', {
            type: 'CommentModerated',
            data: commentModerated
        })
    }

    res.send({});

});

app.get('/comments',(req,res) => {
    res.send(commentModerated);
})


app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
});

