<template>
<form
	v-if="!!authToken"
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
</template>

<script lang="ts">
import {
	defineComponent, onBeforeMount, reactive, inject
} from 'vue'

export default defineComponent({
	setup() {
	  //onBeforeMount(()=>localStorage.setItem('@DoWhile:Token','wifjfjskaaa'))

		let authToken = localStorage.getItem('@DoWhile:Token')
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
		return { handleChange, handleSubmit, authToken, open }
	}
})
</script>
