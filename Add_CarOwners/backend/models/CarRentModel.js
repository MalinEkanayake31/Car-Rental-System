const mongoose=require('mongoose');

const rentschema=new mongoose.Schema({
    name:String,
    nic:String,
    mobile:Number,
    email:String,
    rent_date:Date,
    price:Number,
    pin:Number,
    carnumber:String,

    // extra bool
    baby_seat:Boolean,
    need_driver:Boolean,
//123

})

const carrentmodel=mongoose.model("rent",rentschema)

module.exports=carrentmodel