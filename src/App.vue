<template>
  <router-view/>
</template>

<script>
import { provide } from 'vue'
import store from '@/store'

export default {
	setup() {
		provide('store', store)
	}
}
</script>

<style lang="scss">
  * {
    margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Inter', sans-serif;
  }
</style>
