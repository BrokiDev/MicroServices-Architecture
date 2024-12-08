import express, { Request, Response } from "express";
import {randomBytes} from 'crypto'
import cors from 'cors'
import axios from "axios";

const PORT = 3000;


interface PostInterface {
    [key: string]: any
}



const posts:PostInterface = {};


const app = express();

app.use(express.json());
app.use(cors());

app.post('/posts/create',async (req:Request,res:Response) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body

    await axios.post('http://event-bus-srv:3005/events',{
        type: 'PostCreated',
        data: {
            id,title
        }
    })

    posts[id] = {
        id,
        title
      };
    res.status(201).json({
        status: 'success',
        message: 'Created post Successfully',
        data:posts[id]
    })
})

app.post('/events',(req:Request,res:Response) => {
    console.log('Event Received:',req.body.type);

    res.send({});

})




app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})