<template>
	<section>
		<dialog class="nes-dialog too-small-warning is-dark">
			<h3>TOO SMALL!</h3>
			<p>
				Hey. This screen is too small to view this page!<br />
				Try rotate your screen!
			</p>
		</dialog>
		<!-- LOADING BALOON -->
		<div id="loading-dialog">
			<p id="loading-message">Loading...</p>
		</div>
	</section>
</template>

<style scoped>
	#loading-dialog {
		text-align: center;
	}
</style>