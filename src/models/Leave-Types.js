import mongoose from "mongoose";

const leaveTypeSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "active",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LeaveTypes = mongoose.models.LeaveTypes ||mongoose.model("LeaveTypes", leaveTypeSchema);
