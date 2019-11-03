const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId,  required: true },
    Email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/ },
    User_Name: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Is_Admin: { type: Number, required: true, Default: 1 },
    Status: { type: Number, required: true, Default: 1 },
    Company_Id: { type: mongoose.Schema.Types.ObjectId,  required: true },
    Create_Date: { type: Date, required: true, Default: Date.Now },
    Modified_Date: { type: Date, required: false }
});

module.exports = mongoose.model('User', userSchema);