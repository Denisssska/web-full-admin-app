import express from 'express'
import { verifyToken } from '../utils/verifyToken.js';
import {
	getProducts,
	getProduct,
	updateProduct,
	createProduct,
	removeProduct,
} from '../controllers/product.controller.js'

const router = express.Router()

router.get('/all', getProducts)
router.get('/:productId', getProduct)
router.delete('/:productId',verifyToken, removeProduct)
router.post('/create', createProduct)
router.patch('/update/:productId',  updateProduct)
export default router;
