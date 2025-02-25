<script>

import ModalContainer from '@/components/ModalContainer.vue';
import Login from '@/views/Login.vue';

export default {
	data() {
		return {
			createMode: false,
			ingredient: {}
		}
	},
	methods: {
		show(ingredient) {
			this.createMode = (! ingredient);
			this.ingredient = ingredient || {};
			return new Promise(async (resolve, reject) => {
				let result = await this.$refs.container.show(
					this.createMode ? 'Create ingredient' : 'Update ingredient');
				resolve(result);
			});
 		},
		update() {
			this.$refs.container.dismiss(this.ingredient);
		},
		submit() {
			this.$refs.submiter.click()
		}
	},
	components: {
		ModalContainer
	}
}

</script>

<template>

	<ModalContainer ref="container">
		<form @submit.prevent="update">
			<table class="table table-hover table-responsive">
				<tbody>
					<tr v-if="ingredient.id">
						<th scope="row">ID</th>
						<td>{{ ingredient.id }}</td>
					</tr>
					<tr>
						<th scope="row">name</th>
						<td>
							<input class="form-control" type="text" v-model="ingredient.name" required />
						</td>
					</tr>
					<tr>
						<th scope="row">labels</th>
						<td>
							<input class="form-control" type="text" v-model="ingredient.labels"required  />
						</td>
					</tr>
					<tr>
						<th scope="row">origin</th>
						<td>
							<input class="form-control" type="text" v-model="ingredient.origin_countrys" required />
						</td>
					</tr>
				</tbody>
			</table>
			<button type="submit" style="display: none" ref="submiter"></button>
		</form>

		<template #footer>
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
				Cancel
			</button>
			<button type="button" class="btn btn-primary" @click="submit">
				{{ createMode ? 'Create' : 'Update' }}
			</button>
		</template>
	</ModalContainer>

</template>
