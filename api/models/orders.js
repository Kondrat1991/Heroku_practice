const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: {type: String, required: true},
    quantity: {type: Number, default: 1},
}, {
    versionKey: false
});

module.exports = mongoose.model('Order', ordersSchema);
