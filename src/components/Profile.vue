<template>
	<!-- MAIN CONTAINER -->
	<div id="main-container" class="main-screen">

		<!-- MAIN INFO -->
		<section id="profile-container" class="animated fadeIn nes-container">
			<div class="containers">
				<div class="nes-container is-rounded is-centered">
					<img id="profile-logo" src="img/jcc_logo.png" width="200" alt="My Logo" />
					<p>@jcchikikomori</p>
					<ul class="profile-list">
            <li>Lazy Geek & Developer</li>
						<li>Android & Web</li><br />
						<li>
							I love <a target="_blank" href="https://open.spotify.com/user/johncyrillcorsanes?si=nvkKy3khSIqs9JvlgJEOIw">dance music!</a>
						</li>
					</ul>
					<button onclick="goToUrl('https://linkedin.com/in/johncyrillcorsanes')" id="linkedin-btn" type="button"
						class="nes-btn"><i class="nes-icon linkedin"></i> <span>LinkedIn</span> </button>
					<button onclick="goToUrl('https://github.com/jcchikikomori')" id="github-btn" type="button" class="nes-btn"><i
							class="nes-icon github"></i> <span>GitHub</span> </button>
					<!-- <button onclick="goToUrl('mailto:johncyrillcorsanes@gmail.com', false)" id="gmail-btn" type="button"
						class="nes-btn"><i class="nes-icon gmail"></i> <span>E-mail</span> </button> -->
					<button onclick="goToUrl('https://www.youtube.com/user/jcstriker1')" id="youtube-btn" type="button"
						class="nes-btn"><i class="nes-icon youtube"></i> <span>YouTube</span> </button>

					<br /><br />
					<p style="font-size: 11px;">
						This is made with</p>
					<p style="font-size: 9px;">
						<button onclick="goToUrl('https://vuejs.org')" type="button"
							class="used-assets-btn nes-btn">VueJS</button>
						<button onclick="goToUrl('https://nostalgic-css.github.io/NES.css/')" type="button"
							class="used-assets-btn nes-btn">NES.css</button>
						<button onclick="goToUrl('https://graphql.org')" type="button"
							class="used-assets-btn nes-btn">GraphQL</button>
						<br /><br />
						<br />
						<!--
						<button onclick="goToUrl('https://jccorsanes.site')" type="button"
							class="used-assets-btn nes-btn is-primary">Visit my blog</button>
						<br /><br /><br />
						-->
						<span style="font-size: 9px;">v{{ app_version }} | <a target="_blank" style="font-size: 9px" href="v1">Visit old version</a></span>

						<br />
						<br />
						<!-- <button type="button" class="nes-btn is-small is-primary" onclick="document.getElementById('loading-dialog').showModal();">
							Show Updates
						</button> -->
					</p>

				</div>
			</div>

			<br />
			<div class="containers">
				<div id="post-container" class="nes-container is-rounded">
					<div id="all-post"></div>
				</div>
			</div>
			
			<Updates></Updates>
		</section>

	</div>
</template>

<script>

import Updates from "../components/Updates.vue";
import {version} from '../../package.json';

const appv = version;

export default {
	name: 'Profile',
	components: {
		Updates
	},
	data () {
		return {
			app_version: appv
		}
	}
};
</script>

