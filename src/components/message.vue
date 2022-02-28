<template>
<div class="wrapper">
<form
	v-if="authState"
	class="message-form"
	@submit="handleSubmit"
>
	<textarea      
		required      
		rows="3"    
		maxlength=" 90"     
		placeholder="Your message here :D"    
		name="message" 
		@change="handleChange"  
	/>    
  <button type="submit">Send message</button>
</form>
<button v-else class="login-button" @click="open">
	<img
		src="@/assets/alternate-icons/github.svg"
		alt="github icon" 
	/>
	<span>Login with Github</span>
</button>
</div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/types'
import { api } from '@/api'

const store = useStore(key)
const authState = ref(false)

const message = reactive({ text: '' })

onMounted(() => {
	setTimeout(() => {
		const token = sessionStorage.getItem('@DoWhile:token')
		authState.value = !!token
	}, 2000)
})

function handleChange(event:Event) {
	const target = event.target as HTMLInputElement
	message.text = target.value
}

async function handleSubmit(event:Event) {
	const token = sessionStorage.getItem('@DoWhile:token')
	const target = event.target as HTMLFormElement
	event.preventDefault()
	try {
		const { data } = await api.post('messages', { message: message.text}, { headers: {
			"Authorization": `Bearer ${token}`
		}})

		alert(JSON.stringify(data))
	} catch (err) {
		alert(err.message)
	}

	target.reset()
}

const open = inject('toggleModal')
</script>

<style lang="scss">
.message-form,
.login-button {
	animation: SlideIn 2s 1 cubic-bezier(0.7,0.7,0.7,0.7);
}

.wrapper {
  height: fit-content;
	width: 500px;
	max-width: 95vw;

	@media(min-width:1024px) {
		display: none;
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
