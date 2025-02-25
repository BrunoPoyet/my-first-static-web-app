<script>

import ApiDataRequest from '@/components/ApiRequester.vue';
import ModalContainer from '@/components/ModalContainer.vue';

export default {
	data() {
		return {
			ingredients: [],
			search: ''
		}
	},
	computed: {
		filteredIngredients() {
			return this.ingredients
				.filter((ingredient) => ingredient.name.includes(this.search))
				.slice(0, 500);
		}
	},
	methods: {
		async getIngredients() {
			this.ingredients = await this.$refs.apiRequester.getIngredients();
		},
		show() {
			return new Promise(async (resolve, reject) => {
				await this.getIngredients();
				let result = await this.$refs.container.show('Select ingredient');
				resolve(result);
			});
 		},
		select(ingredient) {
			this.$refs.container.dismiss({
				ingredient: ingredient
			});
		}
	},
	components: {
		ApiDataRequest,
		ModalContainer
	}
}

</script>

<template>

	<ModalContainer ref="container">
		<p class="text-end">
			<button type="button" class="btn btn-dark" @click="select()">
				<i class="fa-solid fa-plus"></i>
				Create
			</button>
		</p>
		<div class="mb-3">
			<input class="form-control" type="text" v-model="search"
				placeholder="Filter name" />
		</div>
		<table class="table table-hover table-responsive">
			<thead>
				<th class="col-3" scope="col">ID</th>
				<th class="col-3" scope="col">name</th>
				<th class="col-2" scope="col">labels</th>
				<th class="col-3" scope="col">origin</th>
				</thead>
			<tbody>
				<tr v-for="(ingredient) in filteredIngredients" :key="ingredient.id">
					<th scope="row">
						<a title="See" href="#" @click.prevent="select(ingredient)">
							{{ ingredient.id }}
						</a>
					</th>
					<td>{{ ingredient.name }}</td>
					<td>{{ ingredient.labels }}</td>            
						<td>{{ ingredient.origin_countrys }}</td>            
				</tr>
			</tbody>
		</table>
	</ModalContainer>

	<ApiDataRequest ref="apiRequester" />

</template>
