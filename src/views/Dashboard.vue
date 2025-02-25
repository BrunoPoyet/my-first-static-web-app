<script>

import ModalConfirm from '@/components/ModalConfirm.vue';

export default {
	methods: {
		async testModalConfirm() {
			console.log(await this.$refs.modalConfirm.show('Alert', 'Do you confirm?'));
		},
		testCancelToken() {
			localStorage.token = 'fake';
		},
	},
	components: {
		ModalConfirm
	},
	async mounted() {
		// this.testModalConfirm();
	}
};

</script>

<template>

	<div class="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item active" aria-current="page">
					Dashboard
				</li>
			</ol>
		</nav>

		<h1>Dashboard</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<p>
			i18n({{ $t('hello') }})
		</p>
		<p>
			<button type="button" class="btn btn-secondary"
					@click="testCancelToken">
				Cancel token
			</button>
		</p>
	</div>


	<ModalConfirm ref="modalConfirm" />

</template>
