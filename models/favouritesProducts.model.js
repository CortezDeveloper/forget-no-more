const mongoose = require('mongoose');

const favouritesProductsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
  added: { type: Date, default: Date.now },
});

const FavouritesProduct = mongoose.model('FavouritesProduct', favouritesProductsSchema);

module.exports = FavouritesProduct;
