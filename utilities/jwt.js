const jwt = require('jsonwebtoken');

const secretKey = 'HWAI-Technology';

function generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = { verifyToken, generateToken };
