const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    savedAnalyses: [{
        collegeId: Number,
        loanAmount: Number,
        interestRate: Number,
        tenure: Number,
        inflationRate: Number,
        marketReturn: Number,
        savedAt: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('User', userSchema);
