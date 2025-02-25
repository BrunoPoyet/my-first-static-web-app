<script>

import ModalContainer from '@/components/ModalContainer.vue';

export default {
	data: () => ({
		message: ''
	}),
	methods: {
		show(title, message) {
			return new Promise(async (resolve, reject) => {
				this.message = message;
				let result = await this.$refs.container.show(title);
				resolve(result);
			});
 		},
		validate() {
			this.$refs.container.dismiss(true);
 		}
	},
	components: {
		ModalContainer
	}
};

</script>

<template>

	<ModalContainer @keydown.enter="validate" ref="container">
		{{ message }}
		<template #footer>
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
				Cancel
			</button>
			<button type="button" class="btn btn-primary" @click="validate">
				Ok
			</button>
		</template>
	</ModalContainer>

</template>
