<script>

import { jwtDecode } from 'jwt-decode';
import createUserStore from '@/stores/user.js';
import ApiRequester from '@/components/ApiRequester.vue';

export default {
	methods: {
		async login(username, password) {
			// Request auth token.
			const token = await this.$refs.apiRequester.getAuthToken(username, password);
			if (! token) {
				return false;
			}
			// Store auth token (in brower).
			localStorage.token = encodeURIComponent(token);
			// Prepare user information.
			await this.prepare();
			return true;
		},
		async prepare() {
			if (! localStorage.token) {
				return;
			}
			// Request user from auth token.
			const token = decodeURIComponent(localStorage.token);
			const user = await this.$refs.apiRequester.getUserInformation();
			if (! user) {
				return;
			}
			// Get user role.
			const withAdmin = this._getWithAdmin(token, user);
			// Store user information (in store).
			const userStore = createUserStore();
			userStore.setUser(user, withAdmin);
		},
		_getWithAdmin(token, user) {
			const decodedToken = jwtDecode(token);
			if (user.role) {
				return (role === 'admin');
			} else {
				//TODO role is missing
				const username = user.username;
				return (username &&
					username.includes('admin') &&
					username.includes('@get-planet-score.com'));
			}
		},
		logout() {
			// Clear auth token (in brower).
			delete localStorage.token;
			// Clear user information (in store).
			const userStore = createUserStore();
			userStore.unsetUser();
		}
	},
	components: {
		ApiRequester
	}
};

</script>

<template>

	<ApiRequester ref="apiRequester" />

</template>
