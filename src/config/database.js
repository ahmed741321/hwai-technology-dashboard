const mongoose = require("mongoose");
const port = process.env.PORT ||3001;

const connectToDatabase = async (app) => { // تم إضافة معامل app هنا
  try {
    let url = "mongodb+srv://ahmet:Ah1no2ab3@hwai.d53owq5.mongodb.net/Hwai?retryWrites=true&w=majority&appName=Hwai";
    await mongoose.connect(url);
    console.log("MongoDB connected");
    app.listen(port, () => { // هنا نستخدم app لتشغيل الخادم
      console.log(`Server is running on http://localhost:${port}/`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = { connectToDatabase };
