const User = require("../models/users");
var moment = require("moment");
const tokenClass = require("../utilities/jwt");

var home_page = async (req, res) => {
    try {
        const errorMessage = req.flash('error');
        req.session.errorMessage = null;

        delete req.app.locals.appToken;
        res.render("page/login", { message: errorMessage });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


var login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            req.flash('error', 'plese enter email and password');
            return res.redirect("/");
        }
        const user = await User.findOne({ email: email, Password: password });
        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect("/");
        }

        const token = tokenClass.generateToken({ userId: user._id });
        req.app.locals.appToken = token;
        res.status(200).redirect("/user");


    } catch (error) {
        res.status(500).send(error.message);

    }
};

var verify = async (req, res) => {
    try {
        const username = req.query.username;
        const password = req.query.password;
        if (!username || !password) {
            return res.status(400).json({ error: 'Please enter email and password', status: false });
        }

        const user = await User.findOne({ Username: username, Password: password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password', status: false });
        }

        const token = tokenClass.generateToken({ userId: user._id });
        req.app.locals.appToken = token;
        res.status(200).json({ message: "login successfully", status: true, token: token });

    } catch (error) {
        res.status(500).json({ error: error.message, status: false });
    }
};


var verify_token = async (req, res) => {
    try {
        const token = req.query.token; // استقبال التوكن من الطلب

        if (!token) {
            return res.status(400).json({ error: 'Please provide a token', status: false });
        }

        // تحقق من صحة التوكن باستخدام الدالة verifyToken
        const tokenData = verifyToken(token);

        if (tokenData.valid) {
            // في حالة أن التوكن صالح، يمكنك تنفيذ الإجراءات المطلوبة هنا
            // على سبيل المثال، قد ترغب في تخزين معرف المستخدم أو أي بيانات إضافية من التوكن
            const userId = tokenData.userId;

            // يمكنك إرسال رد ناجح بمعرف المستخدم أو أي بيانات أخرى تحتاجها في التطبيق
            res.status(200).json({ message: "Token is valid", status: true, userId: userId });
        } else {
            // في حالة أن التوكن غير صالح، يمكنك إرسال رد برسالة الخطأ
            res.status(401).json({ error: 'Invalid token', status: false });
        }
    } catch (error) {
        // إرسال رد الخطأ في حالة وجود أي خطأ آخر
        res.status(500).json({ error: error.message, status: false });
    }
};

module.exports = {
    home_page,
    login,
    verify,
    verify_token
};
