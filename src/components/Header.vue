<script>

import createUserStore from '@/stores/user.js';
import UserAccess from '@/components/UserAccess.vue';

export default {
	computed: {
		user() {
			const userStore = createUserStore();
			return userStore.user;
		},
		withAdmin() {
			const userStore = createUserStore();
			return userStore.withAdmin;
		}
	},
	methods: {
		setLocale(locale) {
			this.$i18n.locale = locale;
		}
	},
	components: {
		UserAccess
	},
	async mounted() {
		// Prepare user information.
		await this.$refs.userAccess.prepare();
	}
};

</script>

<template>

	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
				<RouterLink class="navbar-brand" to="/">
					Planet-score
				</RouterLink>
			<button class="navbar-toggler" type="button"
					data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link class="nav-link" to="/dashboard">
							Dashboard
						</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/recipes">
							Recipes
						</router-link>
					</li>
					<li v-if="withAdmin" class="nav-item">
						<router-link class="nav-link" to="/admin">
							Admin
						</router-link>
					</li>
				</ul>
				<div class="d-flex">
					<RouterLink v-if="! user" class="btn btn-light" to="/login">
						Login
					</RouterLink>
					<ul v-if="user" class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown"
									role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<i class="fa-regular fa-user"></i>
								{{ user.firstname }} {{ user.lastname }}
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li>
									<RouterLink class="dropdown-item" to="/logout">
										Logout
									</RouterLink>
								</li>
							</ul>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown"
									role="button" data-bs-toggle="dropdown" aria-expanded="false">
								{{ $i18n.locale }}
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li v-for="locale in $i18n.availableLocales" :key="locale">
									<span class="dropdown-item" @click="setLocale(locale)">
										{{ locale }}
									</span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	<UserAccess ref="userAccess" />

</template>

<style scoped>

a.router-link-exact-active {
	color: var(--bs-navbar-active-color);
}

a.btn.router-link-exact-active {
	color: inherit;
}

</style>
