const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    leaveDescription: {
        type: String,
        required: true,
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
    reasonsForApplying: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const Leaves = mongoose.models.Leaves || mongoose.model("Leaves", LeaveSchema);

