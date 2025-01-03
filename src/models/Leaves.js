const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
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
    },
    status: {
        type: String,
        required: true,
        default: "pending",
    },
    approveReason: {
        type: String,
        required: false,
    },
    approvedBy: {
        type: String,
        required: false,
    },
    approvedAt: {
        type: Date,
        required: false,
    },
    rejectReason: {
        type: String,
        required: false,
    },
    rejectedBy: {
        type: String,
        required: false,
    },
    rejectedAt: {
        type: Date,
        required: false,
    }
}, { timestamps: true });

export const Leaves = mongoose.models.Leaves || mongoose.model("Leaves", LeaveSchema);

