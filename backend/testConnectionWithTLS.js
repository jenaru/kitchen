import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    tls: true,
    tlsAllowInvalidCertificates: true,  // Solo para pruebas, no recomendado para producción
    tlsInsecure: true  // Solo para pruebas, no recomendado para producción
  });

  try {
    await client.connect();
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  } finally {
    await client.close();
  }
}

connectDB();
