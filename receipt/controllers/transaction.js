const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const gbucket = require('./gbucket');

const transactionController = {
	read (req, res) {
		const id = req.params.id;
		Transaction.findOne({_id : id})
			.exec(async (err, transaction) => {
				transaction.fpaths = await gbucket.serves(transaction.fpaths);
				if (err) {
					res.json({
						'message': err
					})
				}
				res.json({
					'message': "success",
					'data': transaction
				})
			});
	},

	readAll (req, res) {
		Transaction.find({})
			.exec((err, transactions) => {
				if (err) {
					res.json({
						'message': err
					})
				}
				res.json({
					'message': "success",
					'data': transactions
				})
			});
	},

	async create (req, res) {
		const transaction = new Transaction();


		transaction._id = mongoose.Types.ObjectId();
		transaction.username = req.body.fields.username;
		transaction.fpaths = await gbucket.uploads(req.body.fpaths, transaction._id);

		transaction.save((err, transaction) => {
			if (err) {
				res.json({
					'message': err
				});
			}
				res.json({
					'message': 'success',
					'data': transaction
				});
		});
	}
};

module.exports = transactionController;
