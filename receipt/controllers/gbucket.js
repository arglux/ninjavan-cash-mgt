const util = require('util');
const Cloud = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv').config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const PROJECT_ID = process.env.PROJECT_ID;

const { Storage } = Cloud;
const serviceKey = path.join(__dirname, '../keys.json');
const receiptImageBucket = new Storage({
	keyFilename: serviceKey,
	projectId: PROJECT_ID,
}).bucket(BUCKET_NAME);


/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const gbucket = {
	async uploadsAndServes(fpaths, txnId) {
		try {
			return new Promise((resolve, reject) => {
				this.uploads(fpaths, txnId)
					.then((fileIds) => this.serves(fileIds))
					.then((urls) => {
						resolve(urls)
					})
			})
		} catch (e) {
			console.log(e);
		}
	},

	async uploads(fpaths, txnId) {
		try {
			fileIds = []
			for(i = 0; i < fpaths.length; i++) {
				fileId = `${txnId}-${i}.jpg`;
				fileIds.push(await this.upload(fpaths[i], fileId));
			}
			return fileIds;
		} catch (e) {
			console.log(e);
		}
	},

	async serves(fpaths) {
		try {
			urls = []
			console.log(fpaths)
			for(i = 0; i < fpaths.length; i++) {
				urls.push(await this.serve(fpaths[i]));
			}
			return urls;
		} catch (e) {
			console.log(e);
		}
	},

	async upload(fpath, fileId) {
		try {
			await receiptImageBucket.upload( fpath , {
				destination: fileId,
				metadata: {
					cacheControl: 'public, max-age=31536000',
				},
			});
			console.log(`${fpath} uploaded to ${fileId}`);
			return fileId
		} catch (e) {
			console.log(e);
		}
	},

	async serve(file_id) {
		try {
			const [url] = await receiptImageBucket
				.file(file_id)
				.getSignedUrl({
					version: 'v4',
					action: 'read',
					expires: Date.now() + 60 * 1000, // 1 min to serve client
				});
			console.log(`${file_id} url served.`);
			return url
		} catch (e) {
			console.log(e);
		}
	},
}

module.exports = gbucket;
