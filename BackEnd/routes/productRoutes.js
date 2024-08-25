import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
const router = express.Router();

router.use(cors());

router.get('/', asyncHandler(async (req, res) => {    
        const products = await Product.find({});        
        res.json(products);    
}));

router.get('/:id', asyncHandler(async (req, res) => {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid Product ID');
    }    
        const product = await Product.findById(req.params.id);        
  
        if (product) {  
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    })
);

router.get('/:id/nutrition', asyncHandler(async (req, res) => {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid Product ID');
    }    
        const product = await Product.findById(req.params.id);        
  
        if (product) {  
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    })
);

router.get('/:id/storage', asyncHandler(async (req, res) => {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid Product ID');
    }    
        const product = await Product.findById(req.params.id);        
  
        if (product) {  
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    })
);





export default router;