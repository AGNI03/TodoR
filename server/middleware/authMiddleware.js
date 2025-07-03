const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.Usertoken;
    // console.log(token);

    try {
        if (!token) {
            return res.status(401).json({ message: 'new-user' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Use not found' });
        }

        req.user = user;
        next();
    }catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;