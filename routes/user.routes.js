const User = require("./../models/User.model")
const router = require("express").Router()


// router.post("/", async (req, res) => {
// 	try {
// 		let { userName, email, password, admin, products } = req.body
        
// 		if (!userName) {
// 			return res
// 				.status(400)
// 				.json({ message: "We need a name to create a user" })
// 		}
//         if (!email) {
// 			return res
// 				.status(400)
// 				.json({ message: "We need an email for the account" })
// 		}
//         if (!password) {
// 			return res
// 				.status(400)
// 				.json({ message: "We need a password to create a user" })
// 		}
// 		if (!products) {
// 			products = []
// 		}
// 		const createdUser = await User.create({ userName, email, password, products })
// 		res.status(201).json(createdUser)
// 	} catch (error) {
// 		console.log(error)
// 	}
// })

router.get("/:userId", async (req, res) => {
	try {
		const oneUser = await User.findById(req.params.userId, {
			name: 1,
			_id: 0,
		}).populate("users")
		res.json(oneUser)
	} catch (error) {
		console.log(error)
	}
})


module.exports = router
