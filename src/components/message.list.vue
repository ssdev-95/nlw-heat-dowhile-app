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
			<div class="user-pic">
				<img
					:src="message.user.avatar_url"
					alt="'user-'+message.user.github_id"
				/>
			</div>
      <p>{{message.user.login}}</p>
		</div>
	</div>
	<!-- End card -->
</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useStore } from 'vuex'
import { socket } from '@/api'
import { key, IUser } from '@/types'

type ToggleFunction = (user: IUser) => void;

const store = useStore(key)
const messages = store.getters.messages
const toggleBadge = inject('toggleBadge') as ToggleFunction;

try {
	socket.on('new_message', data => {
		const news: any[] = [...messages.slice(1, 3), data]
		store.dispatch('retrieveMessagesFromDb', { messages: news })
	})
} catch (err) {
	alert(JSON.stringify(err))
}
</script>

<style lang="scss">
.message-card {
	@media (max-width:860px) {
		animation: SlideIn 1s 1 forwards;
		animation-timing-function: cubic-bezier(0.7, 0.7, 0.7, 0.7);
	}
}

@keyframes SlideIn {
	from {
		transform: translateX(-100vw);
	}

	to {
		transform: translateX(0);
	}
}
</style>
