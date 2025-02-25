<script>

import ModalContainer from '@/components/ModalContainer.vue';

export default {
	data: () => ({
		message: '',
		resolve: null
	}),
	methods: {
		async show(title, message) {
			this.message = message;
			return await this.$refs.modalContainer.show(title);
 		}
	},
	components: {
		ModalContainer
	}
};

</script>

<template>

	<ModalContainer ref="modalContainer">
		{{ message }}
	</ModalContainer>

</template>
