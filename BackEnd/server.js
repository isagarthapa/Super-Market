import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productsroutes from './routes/productRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('API is running....');
});

app.use('/api/products', productsroutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    
    app.use(express.static(path.join(__dirname, '/FrontEnd/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'FrontEnd', 'build', 'index.html'))
    );
  } else {    
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));