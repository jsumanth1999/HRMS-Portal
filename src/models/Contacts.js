import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    address: [{
        addressType: {
            type: String,
            required: false
        },
        addressLine1: {
            type: String,
            required: false,
        },
        addressLine2: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        postalCode: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        }
    }],
    others: [{
        contactType: {
            type: String,
            required: false,
        },
        channelType: {
            type: String,
            required: false,
        },
        value: {
            type: String,
            required: false,
        },
        primaryChannel: {
            type: Boolean,
            default: false,
        }
    }]
},{timestamps: true});

export const Contacts = mongoose.models.Contacts || mongoose.model('Contacts', contactSchema);
