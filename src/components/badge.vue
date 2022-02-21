<template>
  <div class="badge">
	  <div class="gradient" />
		<div class="user">
	    <img
				class="avatar"
				:src="user.avatar_url"
				:alt="user.id"
			/>
			<img
			  class="seal"
			  src="../assets/default-icons/seal.svg"
				alt="rocket seal"
			/>
			<div>
			  <h1>{{user.name}}</h1>
			  <a
				  :href="'https://github.com/'+user.login"
					target="__blank"
				>
				  <img
					  src="../assets/alternate-icons/github.svg"
					  alt="github login: xSallus - git icon"
					/>
				  {{user.login}}
				</a>
			</div>
			<p>{{user.bio}}</p>
			<div class="social">
			  <Link
				  :href="user.social.linkedin"
					src="linkedin.svg"
					alt="linkedin icon"
				/>
				<Link
				  :href="user.social.instagram"
          src="instagram.svg"
					alt="instagram icon" 
				/>
				<Link
			  	:href="user.social.twitter"
			    src="twitter.svg"
					alt="twitter icon"
				/>
				<Link
		  		:href="user.social.whatsapp"
				  src="whats.svg"
					alt="whatsapp icon"
				/>
				<Link
				  :href="'mailto:'+user.social.mail"
			  	src="mail.svg"
					alt="mail icon"
				/>
				<Link
				  :href="user.social.rocketseat"
				  src="rocketseat.svg" 
					alt="rocketseat icon" 
				/>
			</div>
		</div>
		<button
			class="close-button"
			@click="toggle"
		>
		  <img
				src="../assets/default-icons/exit.svg"
				alt="exit icon"
			/>
		</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/types'
import Link from './link.vue'

export default defineComponent({
  components: { Link },
	setup() {
		const toggle = inject('toggleBadge')
		const store = useStore(key)

    const user = store.getters.user

		return { user, toggle }
  }
})
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";

$BG: $BLACK-ALT;

.badge {
  width: 100%;
	height: 100%;
  display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	background-color: $BG;

	position: fixed;
	top: 0;
	left: 0;

	z-index: 5;
	animation: SHOW_UP 2s 1 cubic-bezier(0.7, 0.7, 0.7, 0.7);

	& > .gradient {
	  width: 100%;
		height: 35%;
		background: $GRADIENT;
		clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%,0% 75%, 0% 0%);
	}
}

.user {
  width: 12rem;
	height: 65vh;
  margin: 0 auto;
	position: relative;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

  transform: translateY(-30%);

	color: $GRAY100;
	text-align: center;

	& > div {
	  &:first-of-type {
  		h1 {
  		  margin-bottom: 0.5rem;
				color: $WHITE;
  		}
      
			a {
				text-decoration: none;
				font-size: none;
				color: $GRAY100;
			}
		}
	}
}

.avatar {
  width: 180px;
	height: 200px;
	clip-path: polygon(
	  0% 20%, 50% 0%, 100% 20%, 100% 80%,
		50% 100%, 0% 80%, 0% 20%
	);
}

.seal {
  height: 4rem;
	width: 4rem;

	position: absolute;
	top: 0;
	left: 0;
	transform: translateY(-20%);
}

.social {
	width: 11rem;
	height: 7rem;

  display: flex;
	flex-wrap: wrap;
	gap: 1rem;

	align-items: center;
	justify-content: center;
}

.close-button {
  position: fixed;
	top: 1.5rem;
	left: 1.5rem;

	background-color: transparent;
	border: none;

	display: flex;
	align-items: center;
	justify-content: center;

	& > img {
		height: 40px;
		width: auto;
	}

	&:active {
	  filter: sepia(1) hue-rotate(-0.25turn);
	}

	@media(min-width:1024px) {
		filter: sepia(1) hue-rotate(-0.25turn);
	}
}

@key-frames SHOW_UP {
	from: {
		opacity: 0;
	}

	to: {
		opacity: 1;
	}
}
</style>
