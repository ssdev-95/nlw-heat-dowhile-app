<template>
<div class="home">
	<Badge v-if="badge.isOpen" />
	<Header />
	<div v-if="messages" class="message-list">
		<!-- Begin card -->
		<div v-for="message in messages">
	  <div
			:key="new Date.getTime()"
  	  class="message-card"
		>
			<p>Lol</p>
			<div>
				<img 
					src="https://github.com/xSallus.png" 
					alt="xSalus"   
				/>
				<p>xSallus</p>
			</div>
		</div>
		</div>
		<!-- End card -->
  </div>
	<div v-else class="empty-messages">
		<p>No messages yet</p>
	</div>
	<form class="message-form" @submit="handleSubmit">
		<textarea
			required
			row="3"
			maxlength="	90"
			placeholder="Your message here :D"
			name="message"
			@change="handleChange"
		/>
		<button type="submit">
			Send message
		</button>
	</form>
</div>
</template>

<script lang="ts">
import {
	reactive, provide, inject, onBeforeMount
} from 'vue';
import { useStore } from 'vuex';
import Badge from '@/components/badge.vue';
import Header from '@/components/header.vue';
//import Message from '@/components/message.vue'
import { IMessage, key } from '@/types';
// @ is an alias to /src

type FormFunction = (ev:any) => void;

export default {
  components: { Badge, Header },
	setup() {
		let messages = [] as IMessage[]
		const store = useStore(key)
		onBeforeMount(()=>{
			messages = store.getters.messages
		})
		const badge = reactive({ isOpen: false});
		const message = reactive({ text: '' })
		function toggleBadge() {
			const state = !badge.isOpen;
			badge.isOpen = state;
		}
		const handleChange:FormFunction = (ev) => {
			message.text = ev.target.value
		}
		const handleSubmit:FormFunction = (ev) => {
			ev.preventDefault()
			alert(message.text)
		}

		provide('toggle', toggleBadge);
		return {
			toggleBadge,
			badge,
			handleChange,
			handleSubmit,
			messages
		};
	}
}
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
</style>
