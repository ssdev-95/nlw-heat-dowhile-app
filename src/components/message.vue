<template>
<div class="message-card">
  <p>{{message.text}}</p>
  <div @click="press">
    <img                                                  
			:src="message.user.avatar_url"            
			:alt="id"
		/>
		<p>xSallus</p>		
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IMessage } from '@/types'

export default defineComponent({
	props: {
		message: {
		  type: (Object as PropType<IMessage>),
			required: true
		},
		press: {
			type: (Function as PropType<()=>void>),
			required: true
		},
	},
	setup({ message, press }) {
		const id = `user-${message.user.github_id}`
		alert(id)
		return { id, message, press }
	}
})
</script>

<style lang="scss" >
@import "../assets/colors.scss";

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

