const mongoose = require('mongoose');

const cashierSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Description: { type: String, required: true },
    Status: { type: Number, required:true, Default: 0 },
    Create_Date: { type: Date, required: true, default: Date.now },
    Modified_Date: Date
});

module.exports = mongoose.model('Cashier', cashierSchema);