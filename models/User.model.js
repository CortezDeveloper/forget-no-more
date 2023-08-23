const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({

    userName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    password:{
        type : String,
        required : true

    },
    admin:{
        type : Boolean,
        required : true,
        default : false
    },
    products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product"
		},
    ]
},{
    timestamps:true
})




const User = mongoose.model('User',userSchema);
module.exports = User