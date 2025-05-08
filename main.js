import mongoose from 'mongoose';
import 'dotenv/config';
import express from 'express';
import userRoutes from './usuarios/user.route.js';
import libroRoutes from './libros/libro.route.js';


const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/libros', libroRoutes); // Cambia esto por el router de libros cuando esté listo

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
