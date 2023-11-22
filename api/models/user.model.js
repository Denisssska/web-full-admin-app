import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },

		firstname: { type: String },
		lastname: { type: String },
		
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, unique: true },

		phone: { type: String },

		profilePhoto: {
			type: String,
			default:
				'https://img.freepik.com/premium-photo/cartoon-old-man-with-no-mustache_759095-41544.jpg',
		},
	},
	{ timestamps: true }
)
const User = mongoose.model('User',userSchema);
export default User;
