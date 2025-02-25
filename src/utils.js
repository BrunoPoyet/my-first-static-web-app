import axios from 'axios';

/*
 * list
 */

function removeElementAt(elements, index) {
	elements.splice(index, 1);
}

function removeElement(elements, element) {
	let index = elements.indexOf(element);
	if (index >= 0) {
		removeElementAt(elements, index);
	}
}

/*
 * float
 */

function roundFloat(value, precision = 2) {
	const factor = Math.pow(10, precision);
	return Math.round(value * factor) / factor;
};

/*
 * ApiServer
 */

class ApiServer {
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
	}
	createRequester(token) {
		return new ApiServerRequester(this.apiUrl, token);
	}
};

class ApiServerRequester {
	constructor(apiUrl, token) {
		this.apiUrl = apiUrl;
		this.token = token;
	}
	async request(method, uri, data) {
		try {
			const config = {
				method: method,
				url: this.apiUrl + uri,
			};
			if (this.token) {
				config.headers = { Authorization: `Bearer ${ this.token }` };
			}
			if (data) {
				config.data = data;
			}
			const res = await axios(config);
			return res.data;
		} catch (err) {
			if (err instanceof axios.AxiosError) {
				return;
			}
			throw err;
		}
	}
};

export {
	removeElementAt,
	removeElement,
	roundFloat,
	ApiServer
};
