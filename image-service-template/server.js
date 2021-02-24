'use-strict';

const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;

try {
	mongoose.connect(
		DATABASE_URL,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => console.log("Atlas connected")
	);
} catch (e) {
	console.log("Error: Could not connect to Atlas");
}

const app = new express();

app.use(bodyParser.json({
	limit: '50mb'
}));

app.use(bodyParser.urlencoded({
	extended: true,
	limit: '50mb'
}));

app.use('/', indexRouter);

app.listen(PORT, () => console.log(`Listening to port: ${PORT}...`));
