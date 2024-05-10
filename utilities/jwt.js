const jwt = require('jsonwebtoken');

const secretKey = 'HWAI-Technology';

function generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}


// تعديل الدالة verifyToken لتحقق من صحة التوكن وترجع الرد المناسب
function verifyToken(token) {
    try {
        // التحقق من صحة التوكن
        const decoded = jwt.verify(token, secretKey);

        // يمكنك إجراء المزيد من العمليات هنا إذا كان التوكن صالحًا
        // مثلاً، التحقق من وجود المستخدم في قاعدة البيانات

        // إذا وصلنا إلى هنا، يعني أن التوكن صالح
        return { valid: true, userId: decoded.userId };
    } catch (error) {
        // إذا حدث خطأ، يُعتبر التوكن غير صالح
        return { valid: false, error: 'Invalid token' };
    }
}


module.exports = { verifyToken, generateToken };
