<script>

import router from '@/router';
import UserAccess from '@/components/UserAccess.vue';

export default {
	methods: {
		logout() {
			// Logout.
			this.$refs.userAccess.logout();
			// Redirect to public home page.
			router.push({ path: '/' });
		}
	},
	components: {
		UserAccess
	},
	mounted() {
		this.logout();
	}
};

</script>

<template>

	<UserAccess ref="userAccess" />

</template>
