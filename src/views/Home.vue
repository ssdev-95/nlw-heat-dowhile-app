<template>
<div class="home">
	<Badge v-if="badge.isOpen" />
	<Header />
	<Messages	v-if="hasMessages" />
	<div v-else class="empty-messages">
		<p>No messages yet</p>
	</div>
	<MessageBox />
	<Modal :isOpen="modal.isOpen" />
</div>
</template>

<script setup lang="ts">
import {
	reactive, 
	provide, 
	inject, 
	onBeforeMount, 
	watchEffect
} from 'vue'

import { useStore } from 'vuex'

import Badge from '@/components/badge.vue'
import Header from '@/components/header.vue'
import MessageBox from '@/components/message.vue'
import Modal from '@/components/modal.vue'
import Messages from '@/components/message.list.vue'

import api from '@/api'
import { IMessage, key } from '@/types'
// @ is an alias to /src

type FormFunction = (ev:any) => void;
interface IReactive {
	list: IMessage[];
}

const endpoint = 'messages/last_3'

const store = useStore(key)

const hasMessages = store.getters.has_messages
const badge = reactive({ isOpen: false })
const modal = reactive({ isOpen: false })
const message = reactive({ text: '' })

watchEffect(() => {
	const code = window.location.search.replace('?code=', '')
	
	history.replaceState('', document.title, '/#/')

  if (!!code.length) {
   	const social = JSON.parse('@DoWhile:user-social-media')

  	api.post('authenticate', { code, social })
		.then(({ data }) => {
  		store.dispatch('toggleAuthState')
			localStorage.setItem('@DoWhile:token', data.token)
  		store.dispatch('login', {user: data.user})
  		alert(data.user.login)
  	})
  }
})

onBeforeMount(async () => {
	const { data } = await api.get(endpoint)
	store.dispatch('retrieveMessagesFromDb', {messages:data})
})

function toggleBadge() {
	const state = !badge.isOpen;
	badge.isOpen = state;
}

function toggleModal() {
	const state = !modal.isOpen;
	modal.isOpen = state;
}

const handleChange:FormFunction = (ev) => {
	message.text = ev.target.value
}
	
const handleSubmit:FormFunction = (ev) => {
	ev.preventDefault()
	alert(message.text)
}

provide('toggleBadge', toggleBadge);
provide('toggleModal', toggleModal)
</script>

<style lang="scss">
	@import "../assets/colors.scss";
  .home {
	  background: $BLACK;
		height: 100vh;
		width: 100vw;

		overflow-y: auto;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		& > .message-list {
		  display: flex;
			width: 100%;
			height: calc(88vh);
			flex-direction: column;
			align-items: flex-start;
			gap: 1.5rem;

			padding: 2rem;
		}

		& > .empty-messages {
			display: flex;       
			width: 100%;   
			height: calc(88vh);     
			justify-content: center;   
			align-items: center;

			& > p {
				font-weight: 500;
				font-size: 2rem;
				color: $YELLOW;
			}
		}
	}

	.message-form {
		width: 100%;
		height: 15rem;
		padding: 0 2rem 2rem;

		display: flex;
		flex-direction: column;
	  gap: 1.35rem;

		justify-self: flex-end;

		& > textarea {
			width: 100%;
			background: $GRAY400;
			flex: 4;
			border-radius: 0.5rem;
			border: 0;
			outline: 0;
			padding: 0.25rem;
			color: $GRAY100;

			&::placeholder {
				color: $GRAY100;
			}

			&:focus {
				background: $GRAY400;
				color: $PINK;
			}
		}

		& > button {
		  width: 100%;
			flex: 2;
			border-radius: 0.5rem;
			border: 0;
			background: $YELLOW;
		}
	}

	.message-card {
		width: 18rem;  
		word-wrap: break-word; 
		padding: 0.45rem; 
		display: flex;  
		flex-direction: column;
		align-items: flex-start; 
		gap: 1rem;
		color: $WHITE;  
		border-bottom: 1px solid $YELLOW;
		border-radius: 0.5rem;

		&:nth-child(2) {                                    
			align-self: flex-end; 
		}
		
		& > p {     
			text-align: justify;  
			text-justify: inter-word;   
		}

		& > div {   
			width: 100%;     
			display: flex;
			gap: 1rem;
			align-items: center;
    
			color: $GRAY100;                                      
  
			& > img {     
				height: 1.7rem;    
				width: 1.7rem;       
				border-radius: 100%;		
				position: relative;

				&::after {       
					content: "";        
					width: 2rem;        
					height: 2rem;         
	  			position: absolute;    
				}
			}
		}
	}

	.login-button {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;

		height: 3rem;
		padding: 0.5rem;
		width: 12rem;
		background: $PINK;
		border: 0;
		border-radius: 0.5rem;

		transform: translateY(-2.5rem);

		/*& > img {
			filter: invert(100%);
		}*/

		& > span {
			color: $WHITE;
			font-size: 1rem;
		}
	}
</style>
