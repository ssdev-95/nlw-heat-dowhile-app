<template>
<!--<div
	class="overlay" 
	:class="{ 'hidden':!props.isOpen }"
>-->
	<div
	  class="modal"
		:class="{ 'hidden':!props.isOpen }"
	>
		<form @submit="submit">
			<label id="whatsapp">
				Whatsapp
				<input
				  name="whatsapp"
					placeholder="+55 (11) 2123-1015"
					@change="change"
					@focus="focusInOut"
					@blur="focusInOut"
				/>
			</label>
			<label id="linkedin">
				Linkedin
				<input
				  name="linkedin"
					placeholder="https://linkedin.com/in/aushahshu"
					@change="change"
					@focus="focusInOut"
					@blur="focusInOut"
				/>
			</label>
			<label id="instagram">
				Instagram
				<input
					name="instagram"
					placeholder="https://instagram.com/ahsuahsua"
					@change="change"
					@focus="focusInOut"
					@blur="focusInOut"
				/>
			</label>
			<label id="rocketseat">
			  Rocketseat
				<input
					name="rocketseat"
					placeholder="https://rocketseat.com.br/me/aushahshu"
					@change="change"
					@focus="focusInOut"
					@blur="focusInOut"
				/>
			</label>
			<label id="twitter">
				Twitter
				<input
					name="twitter"
					placeholder="https://twitter.com/aushahshu"
					@change="change"
					@focus="focusInOut"
					@blur="focusInOut"
				/>
			</label>
			<label id="mail">
				e-Mail
				<input
					name="mail"
					placeholder="aushahshu@domain.com"
					@change="change"
					@focus="focusInOut"
					@blur="focusInOut"
				/>
			</label>
			<div class="actions">
				<button
					type="button"
					class="cancell-btn"
					@click="close"
				>Cancell</button>
				<button
					type="submit"
					class="signin-btn"
				>Login</button>
			</div>
		</form>
	</div>
<!--</div>-->
</template>

<script setup lang="ts" >
import { inject, reactive } from 'vue'

const store_token = '@DoWhile:user-social-media'
const auth_url = `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.VUE_APP_GITHUB_CLIENT_ID}`

type CloseModal = ()=>void;
interface IModalProps {
	isOpen: Boolean
}

const props = defineProps<IModalProps>()

let userSocial = reactive({
	whatsapp: null,
	linkedin: null,
	instagram: null,
	rocketseat: null,
	twitter: null,
	mail: null
})

const close = inject('toggleModal') as CloseModal

function focusInOut (event:Event) {
	const { name } = event.target as HTMLInputElement
	const input = document!.querySelector(`label#${name}`)

	input!.classList.toggle('focus')
}

function change (event: Event) {
	const { name, value } = event.target as HTMLInputElement
	userSocial = {
		...userSocial,
		[name]: value.length ? value : null
	}

	localStorage.setItem(
	  store_token,
		JSON.stringify(userSocial)
	)
}

function submit (event: Event) {
	event.preventDefault()
	const target = event.target as HTMLFormElement
	target.reset()
	close()

	const stored = localStorage.getItem(store_token)

	if (!stored) {
		const stringified = JSON.stringify(userSocial)
		localStorage.setItem(store_token, stringified)
	}

	setTimeout(()=>{
		//alert(localStorage.getItem(store_token))
	  window.location.href = auth_url
	}, 1500)
}
</script>

<style lang="scss">
@import "../assets/colors.scss";

.overlay {
	width: 100vw;
	height: 100vh;

	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	align-items: flex-end;
	justify-content: center;

	background: rgba(0,0,0, .68);
}

.modal {
	width: 500px;
	max-width: 100vw;

	height: 720px;
	max-height: 65vh;
	padding: 2rem;

	position: fixed;
	left: 0;
	bottom: 0;

	display: flex;
	flex-direction: column;
	gap: 2rem;

	transform: translateY(0%);


	&.hidden {
		transform: translateY(100%);
	}

	background: $BLACK-ALT-REVERSE;
	border-radius: 32px 32px 0 0;
	transition: all 2s cubic-bezier(0.7, 0.7, 0.7, 0.7);

	& form {
		width: 100%;
		height: 100%;
		padding: 1rem;

		display: flex;
		flex-direction: column;
	
		align-items: center;
		justify-content: space-around;

		& label {
			width: 100%;
			height: 2.75rem;
			padding: 0 0.5rem;

			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 1rem;

			background: inherit;
			border: 1px solid $YELLOW;
	
			color: $YELLOW;
			font-size: 0.89rem;
			text-align: left;
			border-radius: 8px;

			&.focus {
				border-color:$PINK;
				color: $GREEN;
			}

			& input {
				height: inherit;
				width: 70%;

				background: inherit;
				border: 0;
				outline: 0;

				color: $YELLOW;

				&:autofill,
				&:-webkit-autofill {
					background: inherit;
					color: $GREEN;
				}

			  &::placeholder {
					color: $YELLOW;
				}

				&:focus {
					outline: 0;
					color: $PINK;
			  }

				&:not(:focus) {
					color: $YELLOW;
				}
			}
		}

		& .actions {
			width: 100%;
			display: flex;
			justify-content: space-between;

			& button {
				width: 6rem;
				height: 2.75rem;
				background: inherit;
				border: 2px solid $PINK;
				color: $PINK;
				font-size: 1.25rem;
				border-radius: 8px;

				&[type=submit] {
					color: $GREEN;
					border: 2px solid $GREEN;
				}
			}
		}
	}
}
</style>
