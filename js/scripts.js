/************** FUNCTIONS FIRST ***************/

function loadData() {

}

/************** FUNCTIONS END ***************/

$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});

$(document).ready(function() {

	// setTimeout(function() {
	// 	$('body').removeAttr('hidden');
	// }, 3000);

  $('html').css('overflow', 'hidden');

  $(".show-more").on("click", function(e) {
    $(this).addClass('animated fadeOut');
		// $('html').css('overflow', 'auto');
    $('html').removeAttr('style');
    // reset take tour btn
    setTimeout(function() {
      $(".show-more").removeClass('animated fadeInUp fadeOut fadeIn');
    }, 2000);
	});

  $('.top').on('click', function(){
    $(window).scrollTop(0);
  });

  $('.download-btn').on('click', function(){
  });

  $("a.single_image").fancybox({
		padding: 4,
	});

  // $('.lazy').Lazy({
  //   onFinishedAll: function() {
  //     $('.coverme').hide();
  //   }
  // });

	/***************** Waypoints ******************/

	$('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInLeft');
	}, {
		offset: '75%'
	});
	$('.wp2').waypoint(function() {
		$('.wp2').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp3').waypoint(function() {
		$('.wp3').addClass('animated bounceInDown');
	}, {
		offset: '75%'
	});
	$('.wp4').waypoint(function() {
		$('.wp4').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp5').waypoint(function() {
		$(this).addClass('animated flipInX');
	}, {
		offset: '100%'
	});

  $(".show-more").waypoint(function() {
    $(this).addClass('animated fadeIn');
  }, {
    offset: '75%'
  });
  $('#projects').waypoint(function() {
		$('html').removeAttr('style');
	});

	/***************** Flickity ******************/

	$('#featuresSlider').flickity({
		cellAlign: 'left',
		contain: true,
		prevNextButtons: false
	});

	$('#showcaseSlider').flickity({
		cellAlign: 'left',
		contain: true,
		prevNextButtons: false,
		imagesLoaded: true
	});

	/***************** Fancybox ******************/

	$(".youtube-media").on("click", function(e) {
		var jWindow = $(window).width();
		if (jWindow <= 768) {
			return;
		}
		$.fancybox({
			href: this.href,
			padding: 4,
			type: "iframe",
			'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
		});
		return false;
	});

  $(".fancyiframe").on("click", function(e) {
		var jWindow = $(window).width();
		if (jWindow <= 1024) {
			return;
		}
		$.fancybox({
			href: this.href,
			padding: 4,
			type: "iframe",
      height: 768,
      width: 1024,
      // autoDimensions: false,
		});
		return false;
	});

  $(".fancyajax").on("click", function(e) {
		var jWindow = $(window).width();
		if (jWindow <= 768) {
			return;
		}
		$.fancybox({
			href: this.href,
			padding: 4,
			type: "ajax",
		});
		return false;
	});

  $(".aboutme").on("click", function(e) {
		// var jWindow = $(window).width();
		// if (jWindow <= 768) {
		// 	return;
		// }
		$.fancybox({
			href: "aboutme.html",
			padding: 4,
			type: "ajax",
		});
		return false;
	});

});

/***************** Nav Transformicon ******************/

/* When user clicks the Icon */
$(".nav-toggle").click(function() {
	$(this).toggleClass("active");
	$(".overlay-boxify").toggleClass("open");
});

/* When user clicks a link */
$(".overlay ul li a").click(function() {
	$(".nav-toggle").toggleClass("active");
	$(".overlay-boxify").toggleClass("open");
});

/* When user clicks outside */
$(".overlay").click(function() {
	$(".nav-toggle").toggleClass("active");
	$(".overlay-boxify").toggleClass("open");
});

/***************** Smooth Scrolling ******************/

$('a[href*=#]:not([href=#])').click(function() {
	if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top
			}, 2000);
			return false;
		}
	}
});
