import bcryptjs from 'bcryptjs'
import Product from '../models/product.model.js'

export const createProduct = async (req, res, next) => {
	try {
		const { title, img, color, producer, price, user, inStock, viewsCount } = req.body
		console.log(req.body)
		const newProduct = new Product({
			title,
			img,
			color,
			producer,
			price,
			user,
			inStock,
			viewsCount,
		})
		console.log('newProd', newProduct)
		await newProduct.save()
		res.status(200).json(newProduct)
	} catch (error) {
		console.log('error', error)
		res.status(500).json({
			message: error.message,
		})
	}
}
export const updateProduct = async (req, res) => {
console.log(req.body);
	if (req.body._id !== req.params.productId)
		return res.status(401).json('you can update only your account')
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.productId,
			{
				$set: {
					color: req.body.color,
					createdAt: req.body.createdAt,
					img: req.body.img,
					inStock: req.body.inStock,
					price: req.body.price,
					producer: req.body.producer,
					title: req.body.title,
					user: req.body.user,
					viewsCount: req.body.viewsCount,
				},
			},
			{ new: true }
		)
		
		res.status(200).json(updatedProduct)
	} catch (error) {
		res.status(500).json({
			message: error.message,
		})
	}
}
export const removeProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        Product.findByIdAndDelete(
					{
						_id: productId,
					},
					(err, doc) => {
						if (err) {
							res.status(500).json({
								message: 'Не удалось удалить user',
							})
						}
						if (!doc) {
							return res.status(404).json({
								message: 'User не найден',
							})
						}
						res.status(200).json({
							message: 'User удален',
						})
					}
				)
    } catch (e) {
        res.status(500).json({
            message: 'Не удалось извлечь юзера'
        })
    }
}
export const getProducts = async (req, res) => {
	console.log('Inside allProducts route!')

	// Сортировка по имени пользователя
	const sort = { title: 1 }

	// Получить первые 10 продуктов
	const limit = 10
	// Пропустить первые 10
	const skip = 10
	try {
		const products = await Product.find({})
			.sort(sort)
			// .skip(skip)
			.limit(limit)
		if (!products?.length) {
			return res.status(404).json({ message: 'Products not found' })
		}

		res.status(200).json(products)
	} catch (error) {
		res.status(500).json({
			message: error.message,
		})
	}
}
export const getProduct = async (req, res) => {
	console.log('Inside getProduct route!')

	try {
		const product = await Product.findById(req.params.productId)
		//  console.log('User fetched:', user)
		if (!product) {
			return res.status(404).json({
				message: 'Продукт не найден',
			})
		}

		res.json(product)
	} catch (e) {
		// console.log('Error in getUser:', e)
		res.status(500).json({
			message: 'Не найден продуктЪ',
		})
	}
}
