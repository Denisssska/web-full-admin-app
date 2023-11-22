import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const updateUser = async (req, res) => {
	if (req.user.id !== req.params.userId)
		return res.status(401).json('you can update only your account')
	try {
		// const file = req.file
		if (req.body.password) {
			req.body.password = bcryptjs.hashSync(req.body.password, 10)
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			{
				$set: {
					username: req.body.username,
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					phone: req.body.phone,
					email: req.body.email,
					profilePhoto: req.body.profilePhoto,
					password: req.body.password,
				},
			},
			{ new: true }
		)
		const { password, ...rest } = updatedUser._doc

		res.status(200).json(rest)
	} catch (error) {
		res.status(500).json({
			message: error.message,
		})
	}
}
export const getUsers = async (req, res) => {
	console.log('Inside allUsers route!')
	// Сортировка по имени пользователя
	const sort = { username: 1 }

	// Получить первые 10 пользователей
	const limit = 10
	// Пропустить первые 10
	const skip = 10
	try {
		const users = await User.find({})
			.sort(sort)
			// .skip(skip)
			.limit(limit)
		// const users = await User.find({})
		// const cursor = User.find({}).sort(sort).cursor()
		// console.log(cursor)
		// // Первая страница
		// const firstPage = await cursor.limit(limit)

		// // Вторая страница
		// const secondPage = await cursor.skip(skip).limit(limit)
		if (!users) {
			return { status: 'error', error: 'Invalid login' }
		}

		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({
			message: error.message,
		})
	}
}
export const getUser = async (req, res) => {
	console.log('Inside getUser route!')
	try {
		const user = await User.findById(req.params.userId)
		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден',
			})
		}
		const { passwordHash, ...userData } = user._doc
		res.json(userData)
	} catch (e) {
		res.status(500).json({
			message: 'Не доступа',
		})
	}
}
