<script>

import ApiDataRequest from '@/components/ApiRequester.vue';
import ModalConfirm from '@/components/ModalConfirm.vue';

export default {
	data() {
		return {
			recipes: []
		}
	},
	methods: {
		async getRecipes() {
			this.recipes = await this.$refs.apiRequester.getRecipes();
		},
		async remove(id) {
			const status = await this.$refs.modalConfirm.show('Delete',
				'Do you confirm you want to delete this item?');
			if (! status) {
				return;
			}
			//TODO
			console.log('remove', id);
		}
	},
	components: {
		ApiDataRequest,
		ModalConfirm
	},
	async mounted() {
		this.getRecipes();
	}
}

</script>

<template>

	<div class="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item active" aria-current="page">
					Recipes
				</li>
			</ol>
		</nav>
	
		<h1>Recipes ({{ this.recipes.length }})</h1>
		<p class="text-end">
			<button type="button" class="btn btn-dark">
				<i class="fa-solid fa-plus"></i>
				Add
			</button>
		</p>
		<table class="table table-hover table-responsive">
			<thead>
				<th scope="col">ID</th>
				<th scope="col">GTIN</th>
				<th scope="col">name</th>
				<th scope="col">grammage</th>
				<th scope="col">category</th>
				<th scope="col"></th>
			</thead>
			<tbody>
				<tr v-for="(recipe) in recipes" :key="recipe.id">
					<th scope="row">
						<router-link title="See" :to="{
							name: 'Recipe',
							params: {
								id: recipe.id
							}
						}">
							{{ recipe.id }}
						</router-link>
					</th>
					<td>{{ recipe.gtin }}</td>
					<td>{{ recipe.name }}</td>
					<td>{{ recipe.grammage }}</td>            
					<td>{{ recipe.category }}</td>
					<td>
						<button type="button" class="btn btn-light" title="Delete"
								@click="remove(recipe.id)">
							<i class="fa-regular fa-trash-can"></i>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<ApiDataRequest ref="apiRequester" />
	<ModalConfirm ref="modalConfirm" />

</template>
