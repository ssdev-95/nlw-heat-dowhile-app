<template>
<header class="header">
	<img
	  class="logo"
		src="@/assets/default-icons/dowhile.svg"
		alt="logo dowhile" 
	/>
	<div v-if="loading" class="profile-pic">
		<Spinner />
	</div>
	<div
		v-else
		class="profile-pic"
		:class="{ 'logged': auth }"
	>
		<img
			v-if="!auth"
			src="@/assets/default-icons/me.svg"
			alt="profile pic"
		/>
		<img
			v-else
			:src="state.user.avatar_url"
			class="user_pic"
			alt="profile pic"                             
		/>
	</div>
</header>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Spinner from '@/components/spinner.vue'
import { key } from '@/types'
import { api } from '@/api'

const store = useStore(key)	
let auth = ref(false)
const state = reactive({ user: null })
let loading = ref(false)

onMounted(() => {
	setTimeout(() => {
		const token = sessionStorage.getItem('@DoWhile:token')
		const storedUser = store.getters.user
		loading.value = true
		if(!!token) {
		  if(storedUser) {
				state.user = storedUser
				auth.value = true
			} else {
				api.get('profile', {
					headers: {
						"Authorization": `Bearer ${token}`
					}
				}).then(res => {
					state.user = res.data
					auth.value = true
				})
			}
		}

		setTimeout(() => {
		  loading.value = false
		}, 1200)
	}, 2000)
})
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

	@media (min-width:1024px) {
		justify-content: flex-start;
	}
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

	&.logged {
		&:after {
			content: "";
			position: absolute;  
			width: inherit;
			height: inherit;
			background: $GRADIENT;
			border-radius: inherit;
		}
  }

	& > img {
		width: 75%;
		height: 75%;
		border-radius: inherit;
		position:relative;

		&.user_pic {
			width: 92%;
			height: 92%;
		  border: 2px solid $GRAY400;
			z-index: 2;
		}
	}

	@media (min-width:1024px) {
		display: none;
	}
}
</style>
