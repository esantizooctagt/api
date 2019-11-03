const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Address : { type: String, required: true },
    House_No: { type: String, required: false },
    Country: { type: String, required: true, enum: (['Germany','Austria','Guatemala','El Salvador','Honduras','Nicaragua','Costa Rica','Panama','Mexico']) },
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
        Cashiers_No: { type: Number, required: true, Default: 1 },
        Cashiers: [{
            Cashier_Id: { type: mongoose.Schema.Types.ObjectId, required: true },
            Description: { type: String, required: true },
            Documents: [{
                Prefix: { type: String, required: false },
                Next_Number: { type: Number, required: true },
                Sufix: { type: String, required: false },
                Docto_Type: { type: String, required: true, enum: (['invoice']) },
                Status: { type: Number, required:true, Default: 1 }
            }],
            Status: { type: Number, required:true, Default: 1 }
        }],
        Status: { type: Number, required:true, Default: 0 },
    }],
    Applications: [{
            Application_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref = 'Application' }
    }],
    Taxes: [{
        Tax_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref = 'Tax' },
        Name: { type: String, required: true },
        Percentage: { type: Number, required: true },
        Include_Tax: { type: Boolean, required: true },
        Status: { type: Number, required: true, Default: 1 }
    }],
    Status: { type: Number, required: true, Default: 1 }, 
    Create_Date: { type: Date, required: true, default: Date.now },
    Modified_Date: Date
});

module.exports = mongoose.model('Company', companySchema);