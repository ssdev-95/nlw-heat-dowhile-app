<template>
<header class="header">
	<img
	  class="logo"
		src="@/assets/default-icons/dowhile.svg"
		alt="logo dowhile" 
	/>
	<div class="profile-pic">
		<img
			v-if="!auth"
			src="@/assets/default-icons/me.svg"
			alt="profile pic"
		/>
		<img
			v-else
			:src="user.avatar_url"
			class="user_pic"
			alt="profile pic"                             
		/>
	</div>
</header>
</template>

<script setup lang="ts">
//import { onUpdated, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/types'

const store = useStore(key)	
const auth = store.getters.authState
//const state = reactive({ user: store.getters.user })

//onUpdated(()=>alert(auth))

//const { user } = toRefs(state)
//const token = localStorage.getItem('@DoWhile:token')
//if (!!token.length) { alert(token) }
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";

.header {
	width: 1248px;
	max-width: 100vw;
	height: 12vh;
	padding: 1.5rem;

	display: flex;
	align-items: center;
	justify-content: space-between;
}

.logo {
	height: 1.25rem;
	width: auto;
}

.profile-pic {
	width: 2rem;
	height: 2rem;

	border-radius: 100%;
	background: $GRAY400;

	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	& > img {
		width: 75%;
		height: 75%;
	}
}
</style>
