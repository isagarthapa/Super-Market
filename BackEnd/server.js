import express from 'express';
import cors from 'cors';
import products from './data/products.js';

const port = 5000;

const app = express();
app.use(cors());



app.get('/', (req, res) => {
    res.send('API is running....');
});
app.get('/api/products', (req, res) => {
    res.json(products);
});
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});



app.listen(port, () => console.log(`Server running on port ${port}`));