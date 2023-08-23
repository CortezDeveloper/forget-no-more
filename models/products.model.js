const mongoose = require( 'mongoose')

const productSchema = mongoose.Schema({
    productName:{
        type : String,
        required: true
    },
    category:{
        type : [String],
        required: true
    },
    price:{
        type: Number,
        require: true, 
        default: 0
    },
    image:{
        type : [String]
    },
    description:{
        type : String,
        required: true
    },
    // countInStock:{
    //     type : Number,
    //     required: true,
    //     default: 0
    // },
},
{
    timestamps: true
}) 

const Product = mongoose.model('Product', productSchema)  

module.exports =  Product