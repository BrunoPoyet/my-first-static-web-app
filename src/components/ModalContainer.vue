<script>

import { Modal } from 'bootstrap';

export default {
	data: () => ({
		title: ''
	}),
	methods: {
		show(title) {
			return new Promise((resolve, reject) => {
				this.title = title;
				this.resolve = resolve;
				this.modal = new Modal(this.$refs.modal);
				this.modal.show();
			});
 		},
		dismiss(result) {
			this.modal.hide();
			this.resolve(result);
		}
	},
	mounted(){
		this.$refs.modal.addEventListener('hidden.bs.modal', event => {
			this.resolve();
		});
	}
};

</script>

<template>

	<div class="modal fade" aria-labelledby="exampleModalLabel"
			aria-hidden="true" tabindex='-1' ref="modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title">{{ title }}</h2>
					<button type="button" class="btn-close"
						data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<slot />
				</div>
				<div class="modal-footer">
					<slot name="footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
							Close
						</button>
					</slot>
				</div>
			</div>
		</div>
	</div>

</template>
