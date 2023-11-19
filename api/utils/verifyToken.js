import Jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token
console.log(token);
	if (!token) return res.status(401).json({ error: 'You are not authenticated!' })
	Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(401).json('Token is not valid')
		req.user = user
		next()
	})
}
