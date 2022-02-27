<template>
	<div class="spinner-wrapper">
		<div class="spinner" />
	</div>
</template>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.spinner-wrapper {
	height: 30px;
	width: 30px;
	border-radius: 100%;
	position: relative;
}

.spinner {
  width: inherit;
	height: inherit;
	border-radius: inherit;
	background: linear-gradient(to bottom, $ORANGE 0%, #1f1f1f 95%);

	animation: Roll 2s infinite cubic-bezier(0.7,0.7,0.7,0.7);

	&:after {
		content: "";
		background: #1f1f1f;
		width: inherit;
		height: inherit;
		border-radius: inherit;
		transform: scale(90%);
		position: absolute;
	}
}

@keyframes Roll {
	from { transform: rotate(0); }
	to { transform: rotate(360deg); }
}
</style>
