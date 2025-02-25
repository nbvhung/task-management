const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: String,
            expires: 0
        }
    },
    { timestamps: true }
);

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password");

module.exports = ForgotPassword;