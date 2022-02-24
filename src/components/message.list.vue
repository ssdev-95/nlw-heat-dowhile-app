<template>
<div class="message-list">
	<!-- Begin card -->
  <div
    v-for="message in messages"
    :key="message.id"
		class="message-card"
	>
		<p>{{message.text}}</p>
		<div @click="toggleBadge(message.user)">
			<img
				:src="message.user.avatar_url"
				alt="'user-'+message.user.github_id"
			/>
      <p>{{message.user.login}}</p>
		</div>
	</div>
	<!-- End card -->
</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useStore } from 'vuex'
import { key, IUser } from '@/types'

type ToggleFunction = (user: IUser) => void;

const store = useStore(key)
const messages = store.getters.messages
const toggleBadge = inject('toggleBadge') as ToggleFunction;
</script>
