<template>
<div class="message-list">
	<!-- Begin card -->
  <div
    v-for="message in messages"
    :key="message.id"
		class="message-card"
	>
		<p>{{message.text}}</p>
		<div @click="toggleBadge">
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
import { useStore } from 'vuex'
import { key } from '@/types'

const store = useStore(key)
const messages = store.getters.messages
</script>
