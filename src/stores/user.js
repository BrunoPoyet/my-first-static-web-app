import { defineStore } from 'pinia';

export default defineStore('user', {
	state: () => ({ 
		user: null,
		withAdmin: false
	}),
	actions: {
		setUser(user, withAdmin) {
			this.user = user;
			this.withAdmin = withAdmin;
		},
		unsetUser() {
			this.user = null;
			this.withAdmin = false;
		}
	}
});
