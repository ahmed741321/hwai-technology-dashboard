const { verifyToken } = require('../utilities/jwt'); // استيراد وظيفة التحقق من الرمز المميز

const authenticateToken = (req, res, next) => {
    // استخراج الرمز المميز من الطلب (مثل: من رأس الطلب)
    const token = req.app.locals.appToken;

    // التحقق مما إذا كان الرمز المميز موجودًا
    if (!token) {
        //return res.status(401).json({ message: 'Authentication token is required' });
        return res.render("error/error_403");

    }

    try {
        // التحقق من صحة الرمز المميز
        const decodedToken = verifyToken(token);

        // إضافة البيانات المفكوكة إلى الطلب لاستخدامها في المناطق اللاحقة من التطبيق
        req.user = decodedToken;

        // المرور إلى الوسيطة التالية
        next();
    } catch (error) {
        // return res.status(403).json({ message: 'Invalid token', error: error.message });
        return res.render("error/error_403");

    }
};

module.exports = { authenticateToken };
