const mongoose = require ("mongoose");

const bookingSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    phone : {
        type:Number,
        required:true,
        unique:true
    },
    guests : {
        type:Number,
        required:true
    },
    menu : {
        type:String,
        required:true
    },
    perhead : {
        type:Number,
        required:true
    },
    bookingdate : {
        type:Date,
        required:true,
        default: Date.now 
    },
    weddingdate : {
        type:Date,
        required:true,
        default: Date.now 
    },
    message : {
        type: String,
        required:true
    }
})

const Booking = new mongoose.model("Booking", bookingSchema);

module.exports = Booking;