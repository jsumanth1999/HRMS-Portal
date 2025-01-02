import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    saluation: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: false,
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
    role: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    employeeType: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    designation: {
        type: String,
        required: false,
    },
    division: {
        type: String,
        required: false,
    },
    taxProcessor: {
        type: String,
        required: false,
    },
    dateOfJoining: {
        type: String,
        required: false,
    },
    pfJoinDate: {
        type: Date,
        required: false,
    },
    dateOfConfirmation: {
        type: Date,
        required: false,
    }
}, {
    timestamps: true
});

export const User = mongoose.models.users || mongoose.model("users", userSchema);

