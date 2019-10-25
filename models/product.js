const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Type: { type: String, required: true },
    Unit_Price: { type: Number, required: true },
    Unit_Cost: { type: Number, required: false },
    Qty: { type: Number, required: false },
    Img_Path: { type: String, required: true },
    Status: { type: Number, required: true },
    Company_Id: { type:mongoose.Schema.Types.ObjectId, required: true, ref = 'Company' },
    Create_Date: { type: Date, required: true, default: Date.now },
    Modified_Date: Date
});

module.exports = mongoose.model('Product', productSchema);