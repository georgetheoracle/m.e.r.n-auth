import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connect to Mongodb')
}).catch((err) => {
    console.log(err);
});

const app = express();
app.listen(3000, ()=>{
    console.log('Server is Listening on Port 3000')
});

// API routes
app.get('/', (req, res) => {
    res.json({
        message: 'API mounted'
    })
})
app.use('/api/user', userRoutes)