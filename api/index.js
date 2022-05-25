import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7200; 
const connect = async () => {    
    try {
        await mongoose.connect(process.env.MONGO);
    } 
    catch (error) {
        console.log(error);
    }
}

mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected");
});


app.use(express.json());
app.use('/api/users', userRoute);

app.listen(PORT, () =>{
    connect();
    console.log(`Listening on port ${PORT}`);
});
