<template>
<div class="overlay" >
	<div class="modal">
		<form @submit="submit">
			<label>
				+55 (DDD)
				<input name="zap" @change="change" />
			</label>
			<label>
				linkedin.com/in/
				<input name="linkedin" @change="change" />
			</label>
			<label>
				instagram.com/
				<input name="instagram" @change="change" />
			</label>
			<label>
			  rocketseat.com.br/me/
				<input name="rocketseat" @change="change" />
			</label>
			<label>
				twitter.com/
				<input name="twitter" @change="change" />
			</label>
			<label>
				mailto:
				<input name="mail" @change="change" />
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
</div>
</template>

<script lang="ts" >
import { PropType, defineComponent, reactive } from 'vue'
const store_token = '@DoWhile:user-social-media'

export default defineComponent({
  props: {
	  close: {
			type: (Function as PropType<()=>void>),
			required: true
		}
	},
	setup ({ close }) {
		let userSocial = reactive({
			zap: '',
			linkedin: '',
			instagram: '',
			rocketseat: '',
			twitter: '',
			mail: ''
		})

		function change (event: Event) {
			const { name, value } = event.target as HTMLInputElement
			userSocial = {
				...userSocial,
				[name]: value
			}

			localStorage.setItem(
			  store_token,
				JSON.stringify(userSocial)
			)
		}

		function submit (event: Event) {
			event.preventDefault()
			alert(localStorage.getItem(store_token))
		}

		return { close, change, submit }
	}
})
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
	max-width: 100px;

	height: 720px;
	max-height: 80vh;
	padding: 2rem;

	display: flex;
	flex-direction: column;
	gap: 2rem;

	background: $GRAY400;
	border-radius: 32px 32px 0 0;

	& form {
		width: 100%;
		height: 100%;

		& label {
			width: 100%;
			height: 2.5rem;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;

			background: $GRAY200;

			& input {
				height: inherit;
				width: 50%;

				background: inherit;
				border: 0;
				outline: 0;

				&::focus {
					outline: 0;
			  }
			}
		}
	}
}
</style>
