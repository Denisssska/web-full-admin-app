import mongoose from 'mongoose';
const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },

		img: {
			type: String,
			default:
				'https://img.freepik.com/premium-vector/shirt-design-skull-skateboarder-badge_9645-1351.jpg?w=826',
		},
		color: { type: String, default: 'white' },
		producer: { type: String, default: 'white' },
		price: { type: String, default: '$200' },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		inStock: { type: Boolean, default: false },
		viewsCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
)
const Product = mongoose.model('Product', productSchema)
export default Product
