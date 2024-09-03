import express from 'express';
import cors from 'cors';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// router.use(cors());

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);





export default router;