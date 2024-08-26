import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'FrontEnd', 'dist')));

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, '..', 'FrontEnd', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

app.listen(port, () => console.log(`Server running on port ${port}`));