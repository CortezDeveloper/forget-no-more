const favouritesProduct = require("./../models/favouritesProducts.model")
// const mongoose = require('mongoose');
const router = require("express").Router()
const {isAuthenticated} = require("./../middleware/jwt.middleware")

router.post("/favouritesProducts", isAuthenticated, async (req, res, next) => {
	try {
		let { productId, added   } = req.body
		const userId = req.payload._id
		if (!userId) {
			return res
				.status(400)
				.json({ message: "We couldn't find the user" })
		}
        if (!productId) {
			return res
				.status(400)
				.json({ message: "We couldn't get this product" })
		}
		if (!added) {
			return res
				.status(400)
				.json({ message: "We couldn't add this product" })
		}
		const createdFavouriteProduct = await favouritesProduct.create({ userId, productId, added })
        console.log(createdFavouriteProduct)
		res.status(201).json(createdFavouriteProduct)
	} catch (error) {
		next(error)
	}
})

router.delete("/favouritesProducts/:favProdId", async (req, res) => {
	console.log(req.params.favProdId)
	const id = req.params.favProdId
	try {
		await favouritesProduct.findByIdAndDelete(id)
		res.json({ message: `Your favourite product ${id} was deleted.` })
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
