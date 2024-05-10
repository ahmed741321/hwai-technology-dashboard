const User = require("../models/users");
var moment = require("moment");

var home_page = async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", { users, moment: moment });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

var user_add = (req, res) => {
  res.render("user_add");
};

var view_user = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("user_view", { user, moment: moment });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
var user_show_for_edit = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("user_edit", { user, moment: moment });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

var add_new_user = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/user");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send(error.message);
  }
};

var search = async (req, res) => {
  try {
    const query = req.query.query; // الحصول على قيمة البحث
    // التحقق من أن القيمة المدخلة للعمر هي قيمة عددية
    const isNumeric = !isNaN(query);

    // البحث في قاعدة البيانات إذا كانت القيمة عددية أو استخدام البحث النصي
    let searchResults;
    if (isNumeric) {
      searchResults = await User.find({ Age: query });
    } else {
      searchResults = await User.find({
        $or: [
          { firstName: { $regex: `.*${query}.*`, $options: "i" } },
          { lastName: { $regex: `.*${query}.*`, $options: "i" } },
          { Gender: query },
          { Country: query },
        ],
      });
    }

    // عرض النتائج باستخدام القالب الصحيح (search)
    res.render("search", { users: searchResults, moment: moment });
  } catch (error) {
    console.error("Error searching:", error); // سجل الخطأ للتحقق
    res.status(500).send("Error searching: " + error.message); // إرسال رسالة الخطأ مع تفاصيله
  }
};

var delete_user = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message });
  }
};

var update_user = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // إرسال البيانات إلى الرابط الخاص بك في PHP باستخدام axios
    const response = await axios.get('http://api.hwai.com/Api/User/Update/' + user.Username + "/" + user.Password + "/" + req.body.Username + "/" + req.body.Username);
    if (!response.Status) {
      res.status(500).json({ error: "error.message" });

    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).redirect("/user");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  home_page,
  user_add,
  view_user,
  user_show_for_edit,
  add_new_user,
  search,
  delete_user,
  update_user,
};
