const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = authenticateToken;