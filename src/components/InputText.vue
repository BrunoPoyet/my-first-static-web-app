<script>

export default {
	props: {
		modelValue: String
	}
};

</script>

<template>

	<input class="form-control" type="text" required
		:value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />

</template>

<style scoped>
</style>
