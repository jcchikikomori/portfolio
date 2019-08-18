<template>
	<!-- MAIN CONTAINER -->
	<div id="main-container" class="main-screen" hidden>

		<!-- MAIN INFO -->
		<section id="profile-container" class="animated fadeIn nes-container">
			<div class="containers">
				<div class="nes-container is-rounded is-centered">
					<img src="img/jcc_logo.png" width="200" alt="My Logo" />
					<p>John Cyrill C.</p>
					<ul class="profile-list">
						<li>Programming, Multimedia, and other I.T. stuffs</li>
						<li>
							I love <a target="_blank" href="https://open.spotify.com/user/johncyrillcorsanes?si=nvkKy3khSIqs9JvlgJEOIw">music</a>
						</li>
					</ul>
					<button onclick="goToUrl('https://linkedin.com/in/johncyrillcorsanes')" id="linkedin-btn" type="button"
						class="nes-btn"><i class="nes-icon linkedin"></i> <span>LinkedIn</span> </button>
					<button onclick="goToUrl('https://github.com/jccultima123')" id="github-btn" type="button" class="nes-btn"><i
							class="nes-icon github"></i> <span>GitHub</span> </button>
					<!-- <button onclick="goToUrl('mailto:johncyrillcorsanes@gmail.com', false)" id="gmail-btn" type="button"
						class="nes-btn"><i class="nes-icon gmail"></i> <span>E-mail</span> </button> -->
					<button onclick="goToUrl('https://www.youtube.com/user/jcstriker1')" id="youtube-btn" type="button"
						class="nes-btn"><i class="nes-icon youtube"></i> <span>YouTube</span> </button>
	
					<br /><br />

					<div id="post-container" class="nes-container is-rounded">
						<div id="all-post"></div>
					</div>

					<p style="font-size: 9px;">
						<!-- The external content(s) are provided under the compliance of
						<a style="font-size: 9px" href="https://github.com/nostalgic-css/NES.css/blob/develop/LICENSE">MIT
							License</a>. -->
						<!-- <br /> -->
						<br />
						The 8-bit design was made possible with
						<a style="font-size: 9px" href="https://nostalgic-css.github.io/NES.css/" target="_blank">NES.css</a>
						<br />
						<br />
						<!-- <span style="font-size: 9px;">v2</span> | <a style="font-size: 9px" href="v1">Visit v1.0</a> -->
						<span style="font-size: 9px;">v{{ app_version }}</span>

						<br />
						<br />
						<!-- <button type="button" class="nes-btn is-small is-primary" onclick="document.getElementById('loading-dialog').showModal();">
							Show Updates
						</button> -->
					</p>

				</div>
			</div>
			<br />
			
			<Updates></Updates>
		</section>

	</div>
</template>

<script>

import {version} from '../../package.json';

const appv = version;

export default {
  name: 'Profile',
	data () {
		return {
			app_version: appv
		}
	}
};
</script>

