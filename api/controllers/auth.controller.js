import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'

export const signup = async (req, res, next) => {
	const { username, email, password } = req.body
	const hashedPassword = bcryptjs.hashSync(password, 10)
	const newUser = new User({ username, email, password: hashedPassword })
	try {
		await newUser.save()
		res.status(200).json({ message: 'User created successfully' })
	} catch (e) {
		console.log(e.message)
		res.status(500).json(e.message)
	}
}
export const signin = async (req, res, next) => {
	const { email, password } = req.body
	try {
		const validUser = await User.findOne({ email })
		if (!validUser) return next(errorHandler(404, 'user not found'))
		const validPassword = bcryptjs.compareSync(password, validUser.password)
		if (!validPassword) return next(errorHandler(401, 'invalid credentials'))
		const accessToken = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
		// create a refresh token that doesn't expire
		const refreshToken = jwt.sign({ id: validUser._id }, process.env.REFRESH_TOKEN_SECRET)
		const { password: hashedPassword, ...rest } = validUser._doc
		const inOneWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
		const oneHour = new Date(Date.now() + 3600000)
		res
			.cookie('access_token', accessToken, { httpOnly: true, expires: inOneWeek }) // access token valid for 1 hour
			.cookie('session', accessToken, { httpOnly: false, expires: inOneWeek }) // access token valid for 1 hour
			.cookie('refresh_token', refreshToken, { httpOnly: true, expires: inOneWeek }) // refresh token valid for 1 week
			.status(200)
			.json(rest)
	} catch (e) {
		next(errorHandler(e))
	}
}
export const google = async (req, res, next) => {
	try {
		const validUser = await User.findOne({ email })
		if (validUser) {
			const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
			const { password: hashedPassword, ...rest } = validUser._doc

			const oneHour = new Date(Date.now() + 3600000)
			res.cookie('access_token', token, { httpOnly: true, expires: oneHour }).status(200).json(rest)
		} else {
			const generatedPassword =
				Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
			const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
			const newUser = new User({
				username:
					req.body.name.split(' ').join('').toLowercase() + Math.floor(Math.random() * 10000).toString(),
				email: req.body.email,
				password: hashedPassword,
				profilePhoto: req.body.photo,
			})
		}
		await newUser.save();
			const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
			const { password: hashedPassword, ...rest } = validUser._doc

			const oneHour = new Date(Date.now() + 3600000)
			res.cookie('access_token', token, { httpOnly: true, expires: oneHour }).status(200).json(rest)
	} catch (e) {
		next(errorHandler(e))
	}
}
export const authMe = async (req, res) => {
	//console.log(req)
	try {
		const user = await UserModel.findById(req.params.userId)
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