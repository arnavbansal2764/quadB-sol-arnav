// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include credentials for CORS
}));
app.use(express.json());

//connect mongo
connectDB();

//routes
app.use('/api/auth', authRoutes);



//start backend
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
