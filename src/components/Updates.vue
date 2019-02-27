<template>
	<!-- UPDATE CONTAINER -->
	<div id="update-container" class="containers" style="display: none;">
		<div class="nes-container is-rounded">
			<h4>Updates</h4>	
			<div id="all-post"></div>
		</div>
	</div>
</template>

<script>
	// load updates
	// TODO: Cache updates
	microUpdates.init();
</script>
