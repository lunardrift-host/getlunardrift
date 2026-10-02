(function ($) {
	
	"use strict";

	// Header Type = Fixed
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });


	$('.loop').owlCarousel({
      center: true,
      items:1,
      loop:true,
      autoplay: true,
      nav: true,
      margin:0,
      responsive:{ 
          1200:{
              items:5
          },
          992:{
              items:3
          },
          760:{
            items:2
        }
      }
  });
  
  $("#modal_trigger").leanModal({
		top: 100,
		overlay: 0.6,
		closeButton: ".modal_close"
});

$(function() {
		// Calling Login Form
		$("#login_form").click(function() {
				$(".social_login").hide();
				$(".user_login").show();
				return false;
		});

		// Calling Register Form
		$("#register_form").click(function() {
				$(".social_login").hide();
				$(".user_register").show();
				$(".header_title").text('Register');
				return false;
		});

		// Going back to Social Forms
		$(".back_btn").click(function() {
				$(".user_login").hide();
				$(".user_register").hide();
				$(".social_login").show();
				$(".header_title").text('Login');
				return false;
		});
});

  // Acc
  $(document).on("click", ".naccs .menu div", function() {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
        $(".naccs .menu div").removeClass("active");
        $(".naccs ul li").removeClass("active");

        $(this).addClass("active");
        $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

        var listItemHeight = $(".naccs ul")
          .find("li:eq(" + numberIndex + ")")
          .innerHeight();
        $(".naccs ul").height(listItemHeight + "px");
      }
  });
	

	// Menu Dropdown Toggle
  if($('.menu-trigger').length){
    $(".menu-trigger").on('click', function() { 
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }


  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var width = $(window).width();
        if(width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);  
        }       
        $('html,body').animate({
          scrollTop: (target.offset().top) + 1
        }, 700);
        return false;
      }
    }
  });

  $(document).ready(function () {
      $(document).on("scroll", onScroll);
      
      //smoothscroll
      $('.scroll-to-section a[href^="#"]').on('click', function (e) {
          e.preventDefault();
          $(document).off("scroll");
          
          $('.scroll-to-section a').each(function () {
              $(this).removeClass('active');
          })
          $(this).addClass('active');
        
          var target = this.hash,
          menu = target;
          var target = $(this.hash);
          $('html, body').stop().animate({
              scrollTop: (target.offset().top) + 1
          }, 500, 'swing', function () {
              window.location.hash = target;
              $(document).on("scroll", onScroll);
          });
      });
  });

  function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.nav a').each(function () {
          var currLink = $(this);
          var href = currLink.attr("href");
          if (href && href.startsWith("#") && href.length > 1) {
              try {
                  var refElement = $(href);
                  if (refElement.length && refElement.position()) {
                      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                          $('.nav li a').removeClass("active");
                          currLink.addClass("active");
                      } else {
                          currLink.removeClass("active");
                      }
                  }
              } catch(e) {}
          }
      });
  }


  // Acc
  $(document).on("click", ".naccs .menu div", function() {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
        $(".naccs .menu div").removeClass("active");
        $(".naccs ul li").removeClass("active");

        $(this).addClass("active");
        $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

        var listItemHeight = $(".naccs ul")
          .find("li:eq(" + numberIndex + ")")
          .innerHeight();
        $(".naccs ul").height(listItemHeight + "px");
      }
  });


	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });

	

  // Device / Platform Detection and Auto-reorder
  function detectUserPlatform() {
    var ua = navigator.userAgent || navigator.vendor || window.opera || '';
    var platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';

    // 1. Check TV (Google TV, Android TV, Smart TV, Apple TV, Fire TV, etc.)
    if (/GoogleTV|AndroidTV|SmartTV|HbbTV|POV_TV|AppleTV|BRAVIA|Roku|Tizen|webOS/i.test(ua) || (/(TV|googletv|Android TV)/i.test(ua))) {
      return 'tv';
    }
    // 2. Check iOS (iPhone, iPad, iPod, iPadOS on MacIntel)
    var isIOS = /iPad|iPhone|iPod/.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
      return 'ios';
    }
    // 3. Check Android (Phones & Tablets)
    if (/Android/i.test(ua)) {
      return 'android';
    }
    // 4. Check Windows
    if (/Win32|Win64|Windows|WinCE/i.test(platform) || /Windows/i.test(ua)) {
      return 'windows';
    }
    // 5. Check macOS
    if (/Macintosh|MacIntel|MacPPC|Mac68K|Mac OS/i.test(platform) || /Mac OS/i.test(ua)) {
      return 'mac';
    }
    // 6. Check Linux
    if (/Linux/i.test(platform) || /Linux/i.test(ua)) {
      return 'linux';
    }
    return 'web';
  }

  function initPlatformAutoDetect() {
    var detected = detectUserPlatform();
    var $container = $('.platform-icon-buttons');
    if (!$container.length) return;

    var $iosBtn = $container.find('[data-platform="ios"]');
    if ($iosBtn.length) {
      // Ensure iOS is placed at the front
      $container.prepend($iosBtn);

      // Add highlighted active state
      $iosBtn.addClass('detected-platform');

      // Add expanded pill text
      if (!$iosBtn.find('.detected-btn-text').length) {
        $iosBtn.append('<span class="detected-btn-text">Download for iOS</span>');
      }

      // Update header label
      var $label = $('.platform-label');
      if ($label.length) {
        $label.html('<i class="fas fa-layer-group"></i> Select your platform');
      }
    }
  }

  $(document).ready(function() {
    initPlatformAutoDetect();
  });

})(window.jQuery);