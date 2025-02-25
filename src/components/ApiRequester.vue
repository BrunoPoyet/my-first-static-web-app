<script>

import { ApiServer } from '@/utils.js';
import router from '@/router';
import ModalMessage from '@/components/ModalMessage.vue';

export default {
	methods: {
		setApiUrl(apiUrl) {
			this.apiServer = new ApiServer(apiUrl);
		},
		async getAuthToken(username, password) {
			// Request.
			const data = new URLSearchParams();
			data.append('username', username);
			data.append('password', password);
			data.append('grant_type', 'password');
			const requester = this.apiServer.createRequester();
			const result = await requester.request('post', '/v1/auth/token', data);
			if (! result) {
				// If request fails.
				// Alert.
				await this.$refs.modalMessage.show('Alert', 'Login failed.');
				return;
			}
			return result.access_token;
		},
		async _requestData(method, uri, data) {
			// Check auth token.
			if (! localStorage.token) {
				return;
			}
			// Request.
			const token = decodeURIComponent(localStorage.token);
			const requester =  this.apiServer.createRequester(token);
			const result = await requester.request(method, uri, data);
			if (! result) {
				// If request fails.
				// Clear auth token (in brower).
				delete localStorage.token;
				// Alert.
				await this.$refs.modalMessage.show('Alert', 'Authorization failed.');
				// Redirect to logout page.
				router.push({ path: '/logout' });
				return;
			}
			return result;
		},
		async getUserInformation() {
			return await this._requestData('get', '/v1/auth/users/me');
		},
		async getRecipes() {
			return await this._requestData('get', '/v1/recipes');
		},
		async getRecipe(id) {
			return await this._requestData('get', `/v1/recipes/${ id }` );
		},
		async getIngredients() {
			return await this._requestData('get', '/v1/recipes/ingredients' );
			return await this._requestData('get', '/v1/ingredients?search_ingredient=ca' );
		}
	},
	components: {
		ModalMessage
	},
	mounted() {
		//TOTO set API url from env.
		if (true) {
			this.setApiUrl('https://api.getplanetscore.com');
		} else {
			this.setApiUrl('http://127.0.0.1:8000');
		}
	}
};

</script>

<template>

	<ModalMessage ref="modalMessage" />

</template>
