// const mongoose = require('mongoose');

// const customerSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     Name: { type: String, required: true },
//     Percentage: { type: Number, required: true },
//     Include_Tax: { type: Boolean, required: true },
//     Address : { type: String, required: true },
//     House_No: { type: String, required: false },
//     Country: { type: String, required: true, enum: (['Germany','Austria','Guatemala','El Salvador','Honduras','Nicaragua','Costa Rica','Panama','Mexico']) },
//     State: { type: String, required: false } ,
//     Phone: { type: String, required: false },
//     Postal_Code: { type: String, required: false },
//     Tax_Number: { type: String, required: true },
//     Email: { type: String, required: false },
//     Is_Exent: { type: String, required: true },
//     Reason: { type: String, required: false },
//     Status: { type: Number, required: true },
//     CompanyId: { type:mongoose.Schema.Types.ObjectId, required: true, ref = 'Company' },
//     Create_Date: { type: Date, required: true, default: Date.now },
//     Modified_Date: Date
// });

// module.exports = mongoose.model('Customer', customerSchema);