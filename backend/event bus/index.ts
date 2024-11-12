import { Request, Response } from "express";
import axios from "axios";
import express from "express";


const app = express();
const events:object[] = [];

const PORT = 3005;


app.use(express.json());


app.post('/events', async (req:Request,res:Response) => {
    events.push(req.body);

    await axios.post('http://posts-cluster-ip-srv:3000/events',req.body)
    // await axios.post('http://localhost:3001/events',req.body)
    // await axios.post('http://localhost:3002/events',req.body).catch((err) => console.log('Error conectando al query services'));
    // await axios.post('http://localhost:3003/events',req.body)

    res.send({status: 'OK'})
})


app.get('/events',(req:Request,res:Response) => {
    res.send(events);
})









app.listen(PORT, () => {
    console.log(`APP Listening on http://localhost:${PORT}`)
})

