<template>
	<div class="drag_click">
		<!-- PARTICLE SYSTEM -->
		<div class="page-bg"></div>

		<div class="animation-wrapper">
			<div class="particle particle-1"></div>
			<div class="particle particle-2"></div>
			<div class="particle particle-3"></div>
			<div class="particle particle-4"></div>
			<div class="particle particle-5"></div>
			<div class="particle particle-6"></div>
			<div class="particle particle-7"></div>
			<div class="particle particle-8"></div>
			<div class="particle particle-9"></div>
			<div class="particle particle-10"></div>
			<div class="particle particle-11"></div>
		</div>

		<div class="page-wrapper">
			<h1>CSS Particles</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: "DragClick",
};
</script>

<style scoped lang="scss">
.drag_click {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	overflow: hidden;
	/* Config */
	$color-bg: #111;
	$color-particle: #fff;
	$spacing: 2560px;
	$time-1: 60s;
	$time-2: 120s;
	$time-3: 180s;
	$time-4: 600s;

	/* Pauls awesome mixin */
	@function particles($max) {
		$val: 0px 0px $color-particle;
		@for $i from 1 through $max {
			$val: #{$val}, random($spacing) + px random($spacing) + px $color-particle;
		}
		@return $val;
	}

	@mixin particles($max) {
		box-shadow: particles($max);
	}

	.page-bg,
	.animation-wrapper {
		z-index: 9999;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.page-bg {
		background: $color-bg url("http://127.0.0.1:3000/images/spiderman-1.jpg")
			no-repeat top center;
		background-size: cover;
		z-index: 999;
	}

	.particle,
	.particle:after {
		background: transparent;
	}

	.particle:after {
		position: absolute;
		content: "";
		top: $spacing;
	}

	.particle-1 {
		animation: animParticle $time-1 linear infinite;
		@include particles(600);
		height: 6px;
		width: 2px;
	}

	.particle-1:after {
		@include particles(600);
		height: 6px;
		width: 2px;
	}

	.particle-2 {
		animation: animParticle $time-2 linear infinite;
		@include particles(200);
		height: 2px;
		width: 2px;
	}

	.particle-2:after {
		@include particles(200);
		height: 2px;
		width: 2px;
	}

	.particle-3 {
		animation: animParticle $time-3 linear infinite;
		@include particles(100);
		height: 6px;
		width: 3px;
	}

	.particle-3:after {
		@include particles(100);
		height: 6px;
		width: 3px;
	}

	.particle-4 {
		animation: animParticle $time-4 linear infinite;
		@include particles(400);
		height: 6px;
		width: 2px;
	}

	.particle-4:after {
		@include particles(400);
		height: 6px;
		width: 2px;
	}
	.particle-5 {
		animation: animParticle $time-4 linear infinite;
		@include particles(300);
		height: 6px;
		width: 2px;
	}

	.particle-5:after {
		@include particles(300);
		height: 6px;
		width: 2px;
	}

	.particle-6 {
		animation: animParticle $time-4 linear infinite;
		@include particles(600);
		height: 6px;
		width: 2px;
	}

	.particle-6:after {
		@include particles(600);
		height: 6px;
		width: 2px;
	}

	.particle-7 {
		animation: animParticle $time-4 linear infinite;
		@include particles(700);
		height: 6px;
		width: 2px;
	}

	.particle-7:after {
		@include particles(700);
		height: 6px;
		width: 2px;
	}

	.particle-8 {
		animation: animParticle $time-4 linear infinite;
		@include particles(400);
		height: 6px;
		width: 2px;
	}

	.particle-8:after {
		@include particles(400);
		height: 6px;
		width: 2px;
	}

	.particle-9 {
		animation: animParticle $time-4 linear infinite;
		@include particles(1000);
		height: 6px;
		width: 2px;
	}

	.particle-9:after {
		@include particles(1000);
		height: 6px;
		width: 2px;
	}

	.particle-10 {
		animation: animParticle $time-4 linear infinite;
		@include particles(420);
		height: 6px;
		width: 2px;
	}

	.particle-10:after {
		@include particles(420);
		height: 6px;
		width: 2px;
	}

	.particle-11 {
		animation: animParticle $time-4 linear infinite;
		@include particles(650);
		height: 6px;
		width: 2px;
	}

	.particle-11:after {
		@include particles(650);
		height: 6px;
		width: 2px;
	}

	@keyframes animParticle {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY($spacing * -1);
		}
	}

	.page-wrapper {
		text-align: center;
		color: #fff;
		z-index: 2;
	}

	/**
 * CODEPEN PROMOTION
 * unrelated to particle system
 */

	.codepen-promo:active,
	.codepen-promo:hover,
	.codepen-promo:link,
	.codepen-promo:visited {
		bottom: 30px;
		display: block;
		position: absolute;
		right: 30px;
		width: 200px;
		z-index: 99;
	}

	.codepen-promo-image {
		width: 100%;
	}

	.unsplash-promo:active,
	.unsplash-promo:hover,
	.unsplash-promo:link,
	.unsplash-promo:visited {
		bottom: 30px;
		display: block;
		position: absolute;
		left: 30px;
		width: 400px;
		z-index: 99;
		color: #666;
		text-decoration: none;
	}
}
</style>