<template>
  <a 
	  v-if="props.href"
		:href="props.href"
		target="__blank"
		class="link"
	>
		<img
		  :src="icon"
		  :alt="props.alt" 
		/>
	</a>
	<button v-else disabled class="link">
	  <img
		  :src="icon"
			:alt="props.alt" 
		/>
	</button>
</template>

<script setup lang="ts">
interface ILinkProps {
  src: string;
	alt: string;
	href: string|null;
}

const props = defineProps<ILinkProps>()

const icon = require(`@/assets/alternate-icons/${props.src}`)
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";

.link {
  text-decoration: none;
	line-height: 0;
	color: $GRAY100;
	background: $GRAY400;
	border-radius: 4px;
	border: none;
	padding: 0.2rem;

	height: 48px;
	width: 48px;

	display: flex;
	align-items: center;
	justify-content: center;

	& img {
  	height: 70%;
	  width: 70%;  
	}

	&:disabled {
		background: $BLACK;
		
		& > img {
			filter: invert(10%);
		}
	}

	&:not(:disabled) {
		&:active {
		  background: $GRAY300;

			& img {
			  filter: invert(80%);
			}
		}

		@media(min-width:1024px) {
		  &:hover {
			  background: $GRAY300;

				&img {
				  filter: invert(80%);
				}
			}
	  }
	}
}
</style>
