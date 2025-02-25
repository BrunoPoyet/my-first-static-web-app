<script>

import router from '@/router';
import numeral from 'numeral';
import { removeElement, roundFloat } from '@/utils.js';
import ApiDataRequest from '@/components/ApiRequester.vue';
import ModalIngredientSelect from '@/components/ModalIngredientSelect.vue';
import ModalIngredientInput from '@/components/ModalIngredientInput.vue';
import ModalContainer from '@/components/ModalContainer.vue';
import ModalConfirm from '@/components/ModalConfirm.vue';

const NUMBER_PRECISION = 0.0005;

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
	computed: {
		totalComponentsWeightRatio() {
			return this.getTotalComponentsWeightRatio();
		},
		alertTotalComponentsWeightRatio() {
			const total = this.getTotalComponentsWeightRatio();
			return (Math.abs(total - 1) > NUMBER_PRECISION);
		}
	},
	methods: {
		async getRecipe() {
			this.recipe = await this.$refs.apiRequester.getRecipe(this.id);
			this.recipe.ingredients.forEach((component) => {
				component.ratio_weight = roundFloat(component.ratio_weight, 3);
			});
		},
		getTotalComponentsWeightRatio() {
			return this.recipe.ingredients.reduce(
				(total, component) => total + component.ratio_weight,
				0);
		},
		formatRatio(value) {
			return numeral(value).format('0.0');
		},
		updateComponentWeightRatio(component, value) {
			component.ratio_weight = value / 100;
		},
		async addComponent() {
			const res = await this.$refs.modalIngredientSelect.show();
			if (! res) {
				return;
			}
			let ingredient = res.ingredient;
			if (! ingredient) {
				ingredient = await this.$refs.modalIngredientInput.show();
				if (! ingredient) {
				return;
			}
			}
			const weightRatio = Math.max(0, 1 - this.getTotalComponentsWeightRatio());
			const component = {
				ratio_weight: weightRatio,
				ingredient: ingredient
			};
			this.recipe.ingredients.push(component);
		},
		async updateComponent(component) {
			const ingredient = await this.$refs.modalIngredientInput.show(component.ingredient);
			if (! ingredient) {
				return;
			}
			component.ingredient = ingredient;
		},
		removeComponent(component) {
			removeElement(this.recipe.ingredients, component);
		},
		async update() {
			const currentDate = new Date();
			console.log('===== update', this.recipe.name);
			// Redirect to recipe page.
			router.push({
				name: 'Recipe', 
				params: {
					id: this.recipe.id
			}});
		}
	},		
	components: {
		ApiDataRequest,
		ModalIngredientSelect,
		ModalIngredientInput,
		ModalContainer,
		ModalConfirm
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
				<li class="breadcrumb-item">
					<router-link :to="{
								name: 'Recipe', 
								params: {
									id: recipe.id
							}}">
						Recipe
					</router-link>
				</li>
				<li class="breadcrumb-item active" aria-current="page">
					Update recipe
				</li>
			</ol>
		</nav>
	
		<h1>
			<router-link :to="{ 
						name: 'Recipe', 
						params: {
							id: recipe.id
					}}">
				<i class="fa-solid fa-angle-left"></i>
			</router-link>
			Update recipe
		</h1>
		<form @submit.prevent="update">

			<table class="table table-hover table-responsive">
				<tbody>
					<tr>
						<th scope="row">ID</th>
						<td>{{ recipe.id }}</td>
					</tr>
					<tr>
						<th scope="row">GTIN</th>
						<td>
							<input class="form-control" type="text" v-model="recipe.gtin" />
						</td>
					</tr>
					<tr>
						<th scope="row">name</th>
						<td>
							<input class="form-control" type="text" v-model="recipe.name" />
						</td>
					</tr>
					<tr>
						<th scope="row">grammage</th>
						<td>
							<input class="form-control" type="text" v-model="recipe.grammage" />
						</td>
					</tr>
					<tr>
						<th scope="row">category</th>
						<td>
							<input class="form-control" type="text" v-model="recipe.category" />
						</td>
					</tr>
				</tbody>
			</table>

			<h2>Ingredients ({{ this.recipe.ingredients.length }})</h2>
			<p class="text-end">
				<button type="button" class="btn btn-dark" @click="addComponent">
					<i class="fa-solid fa-plus"></i>
					Add
				</button>
			</p>
			<div v-if="alertTotalComponentsWeightRatio"
					class="alert alert-danger">
				<i class="fa-solid fa-triangle-exclamation"></i>
				Total % weight is {{ $n(100 * totalComponentsWeightRatio, 'ratio') }}
			</div>
			<table class="table table-hover table-responsive">
				<thead>
					<th class="col-1" scope="col">ID</th>
					<th class="col-2" scope="col">% weight</th>
					<th class="col-3" scope="col">name</th>
					<th class="col-2" scope="col">labels</th>
					<th class="col-2" scope="col">origin</th>
					<th class="col-1" scope="col"></th>
					<th class="col-1" scope="col"></th>
				</thead>
				<tbody>
					<tr v-for="(component) in recipe.ingredients" :key="component.id">
						<th scope="row">{{ component.ingredient.id }}</th>
						<td>
							<input class="form-control text-end spaced-arrows" type="number" step="0.1"
								:value="formatRatio(100 * component.ratio_weight)"
								@input="(event) => 
									updateComponentWeightRatio(component, event.target.value)">
						</td>            
						<td>{{ component.ingredient.name }}</td>            
						<td>{{ component.ingredient.labels }}</td>            
						<td>{{ component.ingredient.origin_countrys }}</td>            
						<td>
							<button type="button" class="btn btn-light" title="Update"
									@click="updateComponent(component)">
								<i class="fa-solid fa-pen"></i>
							</button>
						</td>
						<td>
							<button type="button" class="btn btn-light" title="Delete"
									@click="removeComponent(component)">
								<i class="fa-regular fa-trash-can"></i>
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			<p>
				<router-link class="btn btn-secondary me-3" :to="{ 
							name: 'Recipe', 
							params: {
								id: recipe.id
						}}">
					Cancel
				</router-link>
				<button type="submit" class="btn btn-primary">
					Update
				</button>
			</p>
		</form>
	</div>

	<ApiDataRequest ref="apiRequester" />
	<ModalIngredientSelect ref="modalIngredientSelect" />
	<ModalIngredientInput ref="modalIngredientInput" />
	<ModalConfirm ref="modalConfirm" />

</template>
