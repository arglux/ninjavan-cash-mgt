const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: {
		type: String,
		required: true
	},
	fpaths: {
		type: Array,
		required: true
	}
});

module.exports = mongoose.model('Transaction', TransactionSchema);
