const router = require("express").Router()

const { isAdmin } = require("../middleware/jwt.middleware")

const Product = require("../models/products.model")
const CreateProduct = require("../models/CreateProduct.model")

//Create a new product
router.post("/createproducts", async (req, res, next) => {
	try {
		const product = await Product.create(req.body)
        const newApplication = await CreateProduct.create({
            admin: req.user._id,
            product: product._id,
        })
        res.status(201).json({product, newApplication})
	} catch (error) {
		next(error)
	}
})

//approve CreateProduct (Admin only)
router.post("/createproducts", isAdmin, async function (req, res, next) {
    try {
        const createProduct = await CreateProduct.findByIdAndUpdate(
            req.params._id,
            { status: "approved"},
            { new: true, }
        )
        const product = await Product.findByIdAndUpdate(
            req.params._id,
            req.body, 
            { available: "true" }
        )
        if (createProduct && product) {
            console.log(createProduct, product)
            res.status(201).json({
                message: "Your submission has been accepted"
            })
        } else {
            res.status(404).json({error: "Aplication not found"}) }
        } catch (error) {
            next(error)
        }      
    
})



router.get("/products", async (req, res, next) => {
		Product.find({})
			.then((allProducts) => {
				res.status(200).json(allProducts)
			})
			.catch((error) => {
				// res.status(500).json({message:"Error to get all products"})
				next(error)
			})
	})


//Find specific Product by ID
router.get("/:productId", async (req, res, next) => {
	try {
		const oneProduct = await Product.findById(req.params.productId)
        if (oneProduct) {
            res.json(oneProduct)
        } else {
            res.status(404).json({ error: "Product not found"})
        }
	} catch (error) {
		console.log(error)
	}
})

//Delete a Product
router.delete("/:productId", async (req, res, next) => {
	try {
		const oneProduct = await Product.findByIdAndDelete(req.params.id)
        if(oneProduct) { 
            res.sendStatus(204)
        } else {
            res.status(404).json({error: "Product not found"})
        } 
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
