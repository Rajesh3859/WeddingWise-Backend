const mongoose = require("mongoose");

// Correct schema definition
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: URL,
            required: true,
            default:
                "https://bmbwinhouse.com/wp-content/uploads/2024/02/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isSuperAdmin: {
            type: Boolean,
            default: false,
        }
    },
  { timestamps: true }
);

// Create and export the mode

module.exports = userSchema;
