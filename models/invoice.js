// const mongoose = require('mongoose');

// const invoiceSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     Invoice_Id: { type: String, required: true },
//     Status: { type: Number, required: true },
//     Payment_Status: { type: Number, required: true },
//     Payment_Auth: { type: String, required: false },
//     Payment_Date: { type: Date, required: true },
//     Invoice_Date: { type: Date, required: true },
//     Total: { type: Number, required: true },
//     Total_Tax: { type: Number, required: true },
//     Total_Discount: { type: Number, required: true },
//     User_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref = 'User' },
//     Cashier: { 
//         Cashier_Id: {type: mongoose.Schema.Types.ObjectId, required: true },
//         Description: { type: String, required: true }
//     },
//     Company_Id: { type:mongoose.Schema.Types.ObjectId, required: true },
//     Customer: {
//         Customer_Id: { type:mongoose.Schema.Types.ObjectId, required: true },
//         Name: { type: String, required: true },
//         Address : { type: String, required: true },
//         House_No: { type: String, required: false },
//         //Postal_Code: { type: String, required: false },
//         Phone: { type: String, required: false },
//         Email: { type: String, required: false },
//         Tax_Number: { type: String, required: true },
//         Is_Exent: { type: Boolean, required: true, Default: false },
//         Reason: { type: String, required: false },
//         Status: { type: Number, required:true, Default: 1, min: 0, max: 4 }
//     },
//     Items: [{
//         Line_No: { type: Number, required: true },
//         Product: {  
//                     Product_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref = 'Product' }, 
//                     Type_Id: { type: String, required = true },
//                     Img_Path: { type: String, required = false }
//                  },
//         Name: { type: String, required: true },
//         Type: { type: String, enum: Object.values(["goods", "services"]), required: true },
//         Tax: { 
//                 Tax_Id: { type: mongoose.Schema.Types.ObjectId, required: true },
//                 Name: { type: String, required: true },
//                 Percentage: { type: Number, required: true },
//                 Include_Tax: { type: Boolean, required: true } 
//              },
//         Qty: { type: Number, required: true },
//         Unit_Price: { type: Number, required: true },
//         Discount: { type: Number, required: false },
//         Total: { type: Number, required: true },
//         To_Go: { type: Boolean, required: true },
//         Delivery_Date: { type: Date, required: false }

//     }],
//     Status: { type: Number, required: true, Default: 1, min: 0, max: 4 }, 
//     Create_Date: { type: Date, required: true, default: Date.now },
//     Modified_Date: Date
// });

// module.exports = mongoose.model('Invoice', invoiceSchema);