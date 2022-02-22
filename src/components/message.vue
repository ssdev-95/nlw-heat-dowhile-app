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
import { reactive, inject } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/types'

const store = useStore(key)
const authState = store.getters.auth_state
//let authToken = localStorage.getItem('@DoWhile:token')

const message = reactive({ text: '' })

function handleChange(event:Event) {
	const target = event.target as HTMLInputElement
	message.text = target.value
}

function handleSubmit(event:Event) {
	event.preventDefault()
	alert(message.text)
}

const open = inject('toggleModal')
</script>

<style lang="scss">
.wrapper {
  height: fit-content;
	width: fit-content;

	@media(min-width:1024px) {
		display: none;
	}
}
</style>
