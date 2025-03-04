import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        token: String,
        status: {
            type: String,
            default: "active"
        }, 
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    { timestamps: true }        
);

const User = mongoose.model("User", userSchema, "users");

export default User;