jQuery(function($){
	
	window.isTouchDevice = 'ontouchstart' in document.documentElement;
	
	
	var body = $("body");
	var header = $("header");
	var dropDowns = $(".menu-item-has-children ul, .links-sub-menu", header);

	var subnavToggle = $(".menu-item-has-children");
	var mobilenavToggle = $(".menu-toggle");
	var linksnavToggle = $(".user-option");
	var menuOverlay = $(".menu-overlay");
	var headerLinks = $(".links a");
	var nav = $(".nav");

	var forgotWin = $(".forgot-window");


	function closeMenu(){
		dropDowns.stop(!0,!0).slideUp("fast").removeClass("active-sub");

		headerLinks.removeClass("active");
		subnavToggle.removeClass("active");
		mobilenavToggle.removeClass("active");

		$("body").removeAttr("style");

		menuOverlay.stop(!0,!0).fadeOut("fast");
		
		forgotWin.fadeOut("fast");

		if(window.innerWidth < 1024){
			$(".nav, .links").slideUp("fast").removeClass("active-sub");
		}
	}

	function updateBodyPadding(){
		var headerHeight = header.outerHeight();
		var subnavHeight = 0;

		if(window.innerWidth > 1023){
			subnavHeight = $(".active-sub", header).outerHeight();
		} else {
			subnavHeight = $(".nav:visible", header).outerHeight() + $(".links:visible", header).outerHeight();
		}
		subnavHeight = subnavHeight ? subnavHeight : 0;

		body.css({paddingTop: headerHeight + subnavHeight});
	}

	var paddingFixTimer = null;
	$(window).resize(function(){
		updateBodyPadding();
		clearTimeout(paddingFixTimer);
		paddingFixTimer = setTimeout(updateBodyPadding, 600);
	}).trigger("resize");

	$(".sub-menu a").click(function(e){
		e.stopPropagation();
	});
	
	subnavToggle.click(function(e){
		var lnk = $(this);
		if(lnk.hasClass("active")){
			if(window.innerWidth > 1023){
				closeMenu();
			}
			return false;
		}

		subnavToggle.removeClass("active");
		headerLinks.removeClass("active");
		dropDowns.stop(!0,!0).slideUp("fast").removeClass("active-sub");
		forgotWin.stop(!0,!0).fadeOut("fast");

		var subMenu = $(this).find("ul");
		subMenu.stop(!0,!0).css("visibility", "hidden").show().addClass("active-sub");
		updateBodyPadding();
		subMenu.hide().removeAttr("style").slideDown("fast");

		menuOverlay.stop(!0,!0).fadeIn("fast");
		lnk.addClass("active");

		return false;
	});
	
	linksnavToggle.click(function(){
		var lnk = $(this);
		if(lnk.hasClass("active")){
			closeMenu();
			return false;
		}

		subnavToggle.removeClass("active");
		headerLinks.removeClass("active");
		dropDowns.stop(!0,!0).slideUp("fast").removeClass("active-sub");
		forgotWin.stop(!0,!0).fadeOut("fast");

		var subLinks = $(this).next(".links-sub-menu");
		subLinks.stop(!0,!0).css("visibility", "hidden").show().addClass("active-sub");
		updateBodyPadding();
		subLinks.hide().removeAttr("style").slideDown("fast");

		menuOverlay.stop(!0,!0).fadeIn("fast");
		lnk.addClass("active");

		if(window.innerWidth < 1024){
			nav.stop(!0,!0).hide().removeClass("active-sub");
			updateBodyPadding();
			nav.show().slideUp("fast");
		}

		return false;
	});
	

	//Menu overlay
	menuOverlay.click(function(){
		closeMenu();
		return false;
	});


	
	//Forgot Pass window
	$(".forgot-toggle").click(function(){
		forgotWin.fadeToggle("fast");
		return false;
	});
	

	//Mobile Menu
	mobilenavToggle.click(function(){
		var toggle = $(this);

		headerLinks.removeClass("active");
		$(".links-sub-menu").slideUp("fast");

		if(!toggle.hasClass("active")){
			//$(".nav, .links").slideDown("fast");
			$(".nav, .links").stop(!0,!0).css("visibility", "hidden").show();
			updateBodyPadding();
			$(".nav, .links").hide().removeAttr("style").slideDown("fast");

			toggle.addClass("active");
			menuOverlay.fadeIn("fast");
		} else {
			closeMenu();
		}

		return false;
	});
	

	//home slider
	var slider = $(".home-slider");
	if(slider.length){
		slider.cycle({
		    fx: "fade",
		    speed: 1500,
		    timeout: 7000,
		    pauseOnHover: true,
		    swipe: true,
		    slides: $(".caption", slider),
		    pagerActiveClass: "active",
		    pager: $(".slider-nav", slider),
		    pagerTemplate: "<span>{{slideNum}}</span>",
		    log: false
	  });
	}


	//quote slider
	var quoteSlider = $(".quote-slider");
	if(quoteSlider.length){
		quoteSlider.cycle({
		    fx: "scrollHorz",
		    speed: 800,
		    timeout: 5000,
		    pauseOnHover: true,
		    swipe: true,
		    slides: $(".caption", quoteSlider),
		    pagerActiveClass: "active",
		    pager: $(".slider-nav", quoteSlider),
		    pagerTemplate: "<span>{{slideNum}}</span>",
		    log: false
	  });
	}
	
	//image slider
	var imageSlider = $(".image-slider");
	if(imageSlider.length){
		imageSlider.cycle({
		    fx: "scrollHorz",
		    speed: 800,
		    timeout: 5000,
		    pauseOnHover: true,
		    swipe: true,
		    slides: $(".caption", imageSlider),
			prev: '.prev',
	        next: '.next',
		    log: false
	  });
	}


	/* skrollr */
	if(window.innerWidth > 767 && !isTouchDevice && typeof skrollr !== "undefined"){
		var s;
		setTimeout(function(){
			s = skrollr.init({
				forceHeight: false/*,
				beforerender: function(data){
				//one way animation
				return data.direction == 'down';
				}*/
			});
		}, 100);
	}


	//
	$('.select-location').SumoSelect();


	//video popup
	if(typeof $.fn.fancybox != "undefined"){
		$('.fancybox-media')
		.attr('rel', 'media-gallery')
		.fancybox({
			openEffect : 'none',
			closeEffect : 'none',
			prevEffect : 'none',
			nextEffect : 'none',
			arrows : false,
			helpers : {
				media : {},
				buttons : {}
			}
		});
	}
	
	
	
	//Profile close
	$(".profile .expand").click(function(){
		$(this).css("visibility", "hidden");
		return false;
	});
	
	
});

