import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
// export const updateUser = async(req,res)=>{

// 	try {
// 		const file = req.file

// 		const { username, profilePhoto, email } = req.body
// 		console.log('body', req.body,file)
// 		const user = await User.findById(req.params.userId)

// 			if (username) {
// 				// Если пришло новое имя - обновляем
// 				user.username = username
// 			}
// 			if (profilePhoto) {
// 				// Если пришло новое.body
// 				user.profilePhoto = profilePhoto
// 			}
// 				await user.save()

// 				res.status(200).json(user)
// 	} catch (error) {
// 		res.status(500).json({
// 			message: error.message,
// 		})
// 	}

// }
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
