const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Invoice_Id: { type: String, required: true },
    Status: { type: Number, required: true },
    Payment_Status: { type: Number, required: true },
    Payment_Auth: { type: String, required: false },
    Payment_Date: { type: Date, required: true },
    Invoice_Date: { type: Date, required: true },
    Total: { type: Number, required: true },
    Total_Tax: { type: Number, required: true },
    Total_Discount: { type: Number, required: true },
    User_Id : { type:mongoose.Schema.Types.ObjectId, required: true, ref = 'User' },
    Company_Id: { type:mongoose.Schema.Types.ObjectId, required: true, ref = 'Company' },
    Customer: {
        Customer_Id: { type:mongoose.Schema.Types.ObjectId, required: true, ref = 'Customer' },
        Name: { type: String, required: true },
        Address : { type: String, required: true },
        House_No: { type: String, required: false },
        Postal_Code: { type: String, required: false },
        Tax_Number: { type: String, required: true },
        Status: { type: Number, required:true, Default: 0 },
        Cashiers: [{
            Cashier_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref = 'Cashier' },
            Description: { type: String, required: true },
            Status: { type: Number, required:true, Default: 0 }
        }],
    },
    Applications: [{
            Application_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref = 'Application' }
    }],
    Status: { type: Number, required: true, Default: 0 }, 
    Create_Date: { type: Date, required: true, default: Date.now },
    Modified_Date: Date
});

module.exports = mongoose.model('Invoice', invoiceSchema);