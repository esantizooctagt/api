// const mongoose = require('mongoose');

// const packageSchema = mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId,  required: true },
//     Description: { type: String, required: true },
//     Price: { type: Number, required: true },
//     Currency: { type: Boolean, required: true },
//     Status: { type: Number, required: true, Default: 1 },
//     Applications: [{
//         Application_Id :{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Application' }
//     }],
//     Create_Date: { type: Date, required: true, Default: Date.Now },
//     Modified_Date: { type: Date, required: false }
// });

// module.exports = mongoose.model('Package', packageSchema);