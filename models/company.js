const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Address : { type: String, required: true },
    House_No: { type: String, required: false },
    Country: { type: String, required: true },
    State: { type: String, required: false } ,
    Phone: { type: String, required: false },
    Postal_Code: { type: String, required: false },
    Tax_Number: { type: String, required: true },
    Email: { type: String, required: false },
    No_Stores: { type: Number, required: true, Default: 1 },
    Stores: [{
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
    }],
    Applications: [{
            Application_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref = 'Application' }
    }],
    Status: { type: Number, required: true, Default: 0 }, 
    Create_Date: { type: Date, required: true, default: Date.now },
    Modified_Date: Date
});

module.exports = mongoose.model('Company', companySchema);