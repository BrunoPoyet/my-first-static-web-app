<script>

import numeral from 'numeral';
import ApiDataRequest from '@/components/ApiRequester.vue';

export default {
	props: [
		'id'
	],
	data() {		
		return {			
			recipe: {
				ingredients: []
			},
		};
	},	
	methods: {
		async getRecipe() {
			this.recipe = await this.$refs.apiRequester.getRecipe(this.id);
			//TODO rename ingredients into components
			//TODO rename into ratioWeight
			console.log(this.recipe);
		}
	},		
	components: {
		ApiDataRequest
	},
	mounted() {
		this.getRecipe();
	}
}

</script>

<template>
	
	<div class="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item">
					<router-link :to="{
						name: 'Recipes'
					}">
						Recipes
					</router-link>

				</li>
				<li class="breadcrumb-item active" aria-current="page">
					Recipe
				</li>
			</ol>
		</nav>
	
		<h1>
			<router-link :to="{
				name: 'Recipes'
			}">
				<i class="fa-solid fa-angle-left"></i>
			</router-link>
			Recipe
		</h1>
		<p class="text-end">
			<router-link class="btn btn-dark" :to="{
				name: 'RecipeUpdate',
				params: {
					id: recipe.id
				}
			}">
				<i class="fa-solid fa-pen"></i>
				Update
			</router-link>
		</p>
		<table class="table table-hover table-responsive">
			<tbody>
				<tr>
					<th scope="row">ID</th>
					<td>{{ recipe.id }}</td>
				</tr>
				<tr>
					<th scope="row">GTIN</th>
					<td>{{ recipe.gtin }}</td>
				</tr>
				<tr>
					<th scope="row">name</th>
					<td>{{ recipe.name }}</td>
				</tr>
				<tr>
					<th scope="row">grammage</th>
					<td>{{ recipe.grammage }}</td>            
				</tr>
				<tr>
					<th scope="row">category</th>
					<td>{{ recipe.category }}</td>
				</tr>
			</tbody>
		</table>

		<h2>Ingredients ({{ this.recipe.ingredients.length }})</h2>
		<table class="table table-hover table-responsive">
			<thead>
				<th class="col-1" scope="col">ID</th>
				<th class="col-1" scope="col">% weight</th>
				<th class="col-4" scope="col">name</th>
				<th class="col-2" scope="col">labels</th>
				<th class="col-4" scope="col">origin</th>
			</thead>
			<tbody>
				<tr v-for="(component) in recipe.ingredients" :key="component.id">
					<th scope="row">{{ component.ingredient.id }}</th>
					<td class="text-end">
						{{ $n(100 * component.ratio_weight, 'ratio') }}
					</td>            
					<td>{{ component.ingredient.name }}</td>            
					<td>{{ component.ingredient.labels }}</td>            
					<td>{{ component.ingredient.origin_countrys }}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<ApiDataRequest ref="apiRequester" />

</template>
