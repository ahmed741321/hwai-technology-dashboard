const mongoose = require("mongoose");
const port = 3001;

const connectToDatabase = async (app) => { // تم إضافة معامل app هنا
  try {
    await mongoose.connect("mongodb://localhost/test");
    console.log("MongoDB connected");
    app.listen(port, () => { // هنا نستخدم app لتشغيل الخادم
      console.log(`Server is running on http://localhost:${port}/`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = { connectToDatabase };
