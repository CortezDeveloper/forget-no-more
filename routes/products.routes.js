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
        if (!category) {
			return res
				.status(400)
				.json({ message: "We need a category for this product" })
		}
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

router.get("/:productId", async (req, res) => {
	try {
		const oneProduct = await Product.findById(req.params.productId, {
			name: 1,
			_id: 0,
		}).populate("product")
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

module.exports = router
