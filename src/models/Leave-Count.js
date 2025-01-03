import mongoose from "mongoose";

const leaveCountSchema = new mongoose.Schema(
  {
    typeId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    opening: {
      type: Number,
      default: 0,
      required: false,
    },
    accured: {
      type: Number,
      default: 0,
      required: false,
    },
    applied: {
      type: Number,
      default: 0,
      required: false,
    },
    rejected: {
      type: Number,
      default: 0,
      required: false,
    },
    cancelled: {
      type: Number,
      default: 0,
      required: false,
    },
    encashed: {
      type: Number,
      default: 0,
      required: false,
    },
    lapsed: {
      type: Number,
      default: 0,
      required: false,
    },
    balance: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const LeaveCount = mongoose.models.LeaveCount|| mongoose.model("LeaveCount", leaveCountSchema);
