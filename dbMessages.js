import mongoose from 'mongoose'

const amazSchema=mongoose.Schema({
    title:String,
    actual_price:String,
    price:String,
    rating:String,
    image:String
})

export default mongoose.model('messageContent',amazSchema);