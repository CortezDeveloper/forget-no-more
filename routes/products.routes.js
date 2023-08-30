const Product = require("./../models/products.model")
const router = require("express").Router()

router.post("/", async (req, res, next) => {
	try {
		let { productName, category, price, image, description   } = req.body
		if (!productName) {
			return res
				.status(400)
				.json({ message: "We need a name for this product" })
		}
        // if (!category) {
		// 	return res
		// 		.status(400)
		// 		.json({ message: "We need a category for this product" })
		// }
		if (!price) {
			return res
				.status(400)
				.json({ message: "We need a price for this product" })
		}
		const createdProduct = await Product.create({ productName, category, price, image, description })
        console.log(createdProduct)
		res.status(201).json(createdProduct)
	} catch (error) {
		next(error)
	}
})

router.get("/", async (req, res, next) => {
		Product.find({})
			.then((allProducts) => {
				res.status(200).json(allProducts)
			})
			.catch((error) => {
				// res.status(500).json({message:"Error to get all products"})
				next(error)
			})
	})



router.get("/:productId", async (req, res) => {
	try {
		const oneProduct = await Product.findById(req.params.productId)
		res.json(oneProduct)
	} catch (error) {
		console.log(error)
	}
})

router.delete("/:productId", async (req, res) => {
	console.log(req.params.productId)
	const id = req.params.productId
	try {
		await Product.findByIdAndDelete(id)
		res.json({ message: `Your product ${id} was deleted.` })
	} catch (error) {
		console.log(error)
	}
})

router.put("/:productId", async (req, res, next) => {
	try{
		const { productName, price, image, description } = req.body
		const id = req.params.productId
		const productToUpdate = { productName, price, image, description } 
		const newProduct = await Product.findByIdAndUpdate(id,productToUpdate, {new: true})

		res.json(newProduct)
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
