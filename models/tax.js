const mongoose = require('mongoose');

const taxSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Percentage: { type: Number, required: true },
    Include_Tax: { type: Boolean, required: true },
    Status: { type: Number, required: true },
    CompanyId: { type:mongoose.Schema.Types.ObjectId, required: true, ref = 'Company' },
    Create_Date: { type: Date, required: true, default: Date.now },
    Modified_Date: Date
});

module.exports = mongoose.model('Tax', taxSchema);