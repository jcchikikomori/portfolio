/************** FUNCTIONS FIRST ***************/

function loadData() {

}

/************** FUNCTIONS END ***************/

// $(window).on('beforeunload', function(){
//   $(window).scrollTop(0);
// });

$(document).ready(function() {

    // setTimeout(function() {
    // 	$('body').removeAttr('hidden');
    // }, 3000);

    setTimeout(function() {
        // $('.loader-wrap').slideOut();
        $('html').removeAttr('style', 'hidden');
        $('.contents').removeAttr('hidden');
        // $('html').css('overflow', 'auto');
        // $('.loader-wrap img').addClass('animated zoomOut');
        // setTimeout(function() {
        	$('.loader-wrap img').remove();
        // }, 350);
    }, 1500);

    // $(".show-more").on("click", function(e) {
    //   $(this).addClass('animated fadeOut');
    //   $('html').css('overflow', 'auto');
    //   $('html').removeAttr('style');
    // reset take tour btn
    //   setTimeout(function() {
    //     $(".show-more").removeClass('animated fadeInUp fadeOut fadeIn');
    //   }, 2000);
    // });

    // SCROLL TO TOP ON CLICK
    $('.top').on('click', function(){
      $(window).scrollTop(0);
    });

    $('.download-btn').on('click', function() {});

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
        $('.wp5').addClass('animated flipInX');
    }, {
        offset: '100%'
    });
    $('.wp6').waypoint(function() {
        $('.wp6').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });

    // $(".show-more").waypoint(function() {
    //     $(this).addClass('animated fadeIn');
    // }, {
    //     offset: '75%'
    // });
    // $('#projects').waypoint(function() {
    //     $('html').removeAttr('style');
    // });

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

    $("a.uhref").on("click", function(e) {
        e.preventDefault();
        // var jWindow = $(window).width();
        // if (jWindow <= 768) {
        // 	return;
        // }
        var url = $(this).attr('href');
        // alert(url);
        $.fancybox({
            href: url,
            padding: 4,
            type: "ajax",
        });
        return false;
    });

    // youtube
    $(".youtube-media").on("click", function(e) {
        e.preventDefault();
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
        e.preventDefault();
        var jWindow = $(window).width();
        if (jWindow <= 1024) {
            return;
        }
        $.fancybox({
            // href: this.href,
            padding: 4,
            type: "iframe",
            height: 768,
            width: 1024,
            href: $(this).data("href").replace(new RegExp("http:", "i"), 'https:'),
            // autoDimensions: false,
        });
        return false;
    });

    $(".fancy").on("click", function(e) {
        e.preventDefault();
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
