<script>

import router from '@/router';
import UserAccess from '@/components/UserAccess.vue';

export default {
	data() {
		return {
			username: 'bruno+admin@get-planet-score.com',
			password: '50047temp33512'
		};
	},
	methods: {
		async login() {
			// Get username and password.
			const username = this.username;
			const password = this.password;
			// Login.
			let status = await this.$refs.userAccess.login(username, password);
			if (! status) {
				return;
			}
			// Redirect to private home page.
			router.push({ path: '/dashboard' });
		}
	},
	components: {
		UserAccess
	}
};

</script>

<template>

	<div class="container">

		<div class="m-5 d-flex flex-column justify-content-center align-items-center">
			<div class="p-4 w-75 border">
				<h1>Login</h1>
				<form @submit.prevent="login">
					<div class="mb-3">
						<label for="username">Username</label>
						<input class="form-control" type="text" id="username" v-model="username" />
					</div>
					<div class="mb-3">
						<label for="password">Password</label>
						<input class="form-control" type="password" id="password" v-model="password" />
					</div>
					<div class="mb-3">
						<RouterLink to="/login">
							Forgot your password?
						</RouterLink>
					</div>
					<p>
						<button type="submit" class="btn btn-primary">
							Login
						</button>
					</p>
				</form>
			</div>
		</div>


	</div>

	<UserAccess ref="userAccess" />

</template>
