
import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    holidayType: {
        type: String,
        required: true,
    },
    alternateWorkingDate: {
        type: Date,
        required: false,
    },
    year: {
        type: Number,
        required: true,
    }
},{timestamps : true});

export const Holidays = mongoose.models.Holidays || mongoose.model('Holidays', holidaySchema);

