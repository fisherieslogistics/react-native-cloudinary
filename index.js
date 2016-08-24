import { NativeModules } from 'react-native';
import Sha1 = from './Sha1';

module.exports new Class({
	config(options) {
		/*
			options = {
				apiSecret,
				apiKey,
				cloudName
			}
		*/
		this.options = options;
	}

	upload (uri) {

		var timestamp = Date.now(),
			keys = "timestamp=" + timestamp + this.options.apiSecret,
			signature = Sha1.hash( keys ),
			obj = {
			    uri: uri,
			    uploadUrl: "https://api.cloudinary.com/v1_1/" + this.options.cloudName + "/image/upload",
			    data: {
			    	api_key: this.options.apiKey,
			    	timestamp: timestamp,
			    	signature: signature
			    }
			};

		return new Promise((resolve, reject) => {
			NativeModules.FileTransfer.upload(obj, (err, res) => {
				if(res) resolve(res);
			  if(err) reject(err);
			});
		});

	}
});
