import mongoose from 'mongoose';
import 'dotenv/config';
import express from 'express';
import userRoutes from './usuarios/user.route.js';


const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
}

connectDB();
