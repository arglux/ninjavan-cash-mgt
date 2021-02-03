'use-strict';

const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT | 8080;

let app = new express();

app.get('/', (req, res) => {
	res.json({"message":"hello world from default frontend"})
});

app.listen(PORT, () => console.log(`Listening to port: ${PORT}...`))
