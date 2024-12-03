const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSecret = 'AuthSecret';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    validate(password) {
      if (password.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain phrase "password"');
      }
    },
    required: true,
  },
  email: {
    type: String,
	unique:true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error("Email should be valid email address");
      }
    },
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  tokens:[
    {
      type: String,
      required:true
    }
  ]
});

userSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email.trim() });

  if (!user) {
    throw new Error("Unable to Login User");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to Login User");
  }
  return user;
};

userSchema.statics.findUserByToken = async function (token) {
  const decoded = jwt.verify(token, authSecret);
  const user = await User.findById(decoded.id);
  return user;
};

// pre-save hook
// userSchema.pre("save", async function () {
//   console.log('save runned');
//   const user = this;
//   if (user.isModified()) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
// });

userSchema.methods.addTask = async function (task) {
  const user = this;
  user.tasks = user.tasks.concat(task);
  await user.save();
};

userSchema.methods.addToken = async function (token) {
  const user = this;
  user.tokens = user.tokens.concat(token);
  await user.save();
};

userSchema.methods.removeToken = async function (token) {
  const user = this;
  user.tokens = user.tokens.filter((token) => {
    return token !== token;
  });
  await user.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
