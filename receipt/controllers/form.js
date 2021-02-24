const path = require('path');
const formidable = require('formidable');

const form = {
	parse (req, res, next) {
		const fpaths = [];
		const fields = {};

		new formidable.IncomingForm().parse(req)
			.on('fileBegin', (name, file) => {
				file.path = path.join('.', 'assets', file.name);
			})
			.on('file', async (name, file) => {
				fpaths.push(file.path);
			})
			.on('field', (key, value) => {
				fields[key] = value;
			})
			.on('end', () => {
				req.body.fpaths = fpaths;
				req.body.fields = fields;
				next();
			})
			.on('aborted', () => {
				console.error('aborted')
			})
			.on('error', (err) => {
				console.err(err)
			})
	}
};

module.exports = form;
