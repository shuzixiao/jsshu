<template>
	<div @click="indexa">11111111</div>
</template>

<script>
	export default {
		name: 'index',
		methods: {
			indexa() {
            this.$router.push({path:'./indexa'})
			}
		}
	}
</script>

<style>

</style>