var mongoose = require("mongoose")
var Schema = mongoose.Schema

var note = new Schema({
    title: String,
    date: String,
    note: String
})

const data = mongoose.model("data", note )

module.exports = data

// const mongoose = require('mongoose');

// const dataSchema = new mongoose.Schema({
//   note: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Data = mongoose.model('Data', dataSchema);

// module.exports = Data;
