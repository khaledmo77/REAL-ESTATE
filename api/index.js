import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
const PORT = 3000;
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log ('connected to the Monogo ');
}).catch((err)=>{
    console.log(err);
})
const app = express();
app.use(express.json());

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
//   app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//   }));
app.post('/api/auth/signup', (req, res) => {
    // Handle signup logic
    res.json({ message: 'Signup successful' });
  });
  
  
  app.use(function (err,req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // "*"
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    next();
   res.status(statusCode).json({
      success: false,
      statusCode,
      message,
   
    })



 });



app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
  });