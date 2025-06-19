import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    // role: {
    //   type: String,
    //   enum: ["user", "host"],
    //   default: "user",
    // },
    gender: { type: String, enum: ["male", "female"] },
    profileImage: {
      type: String,
      default: "", // You can set a default avatar URL here
    },
    phone: {
      type: String,
      default: "9XXXXXXXXX",
    },
    bio: {
      type: String,
      default: "Professional overthinker",
    },
    wishlist: { type: Array, default: [] },
  },
  { timestamps: true }
);

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔓 Compare login password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
