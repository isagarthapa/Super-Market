import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productsroutes from './routes/productRoutes.js';


// Load environment variables based on the environment
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.resolve('.env.production') });
} else {
  dotenv.config({ path: path.resolve('.env') });
}

// Connect to the database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173','https://super-market-1.onrender.com'], // Add your production frontend URL when deploying
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes should be defined before serving static files to avoid conflicts
app.use('/api/products', productsroutes);

// Serve static files from the Vite build directory in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/dist'))); // Update path to Vite's dist folder

  // Serve the React app for any unknown route
  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));
