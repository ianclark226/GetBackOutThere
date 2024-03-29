const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 8,
    },
    type: {
        type: String,
        enum: ["booze", "crafts", "dating", "gaming", "sports"],
        required: true,
    },
    desc: {
        type: String,
        required: true,
        min: 200,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    crowd: {
        type: String,
        enum: ['small', 'medium', 'large'],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    bookmarkedUsers: {
        type: [String],
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model("Event", EventSchema);