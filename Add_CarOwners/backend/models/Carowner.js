import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CarownerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const Carowner = mongoose.model('Carowner', CarownerSchema);

export default Carowner;

















// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const CarownerSchema = new Schema({

//     name : {
//         type : String,
//         required : true
//     },

//     nic : {
//         type : String,
//         required : true
//     },

//     age : {
//         type : Number,
//         required : true
//     },

//     gender : {
//         type : String,
//         required : true
//     },

//     address : {
//         type : String,
//         required : true
//     }

// })


// const Carowner = mongoose.model("Carowner",CarownerSchema);

// module.exports = Carowner;