const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Icon: { type: String, required: true },
    Status: { type: Number, required: true },
    Create_Date: { type: Date, required: true, default: Date.now },
    Modified_Date: Date
});

module.exports = mongoose.model('Application', applicationSchema);