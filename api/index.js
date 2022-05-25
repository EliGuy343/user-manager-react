import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 7200; 

const app = express();
dotenv.config();



app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
});
