const {Schema, model} = require ("mongoose")

const CreateProductSchema = new Schema(
    {
        admin: {
            type: Schema.Types.ObjectId,
            ref: "User", 
        },

        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },

        status: {
            type: String, 
            enum: ["pending", "approved", "rejected"],   
        },
    },
    { timestamps: true }
)

const CreateProduct = model("CreateProduct", CreateProductSchema)

module.exports = CreateProduct;