/*
	Template Name: SaasRiver - SaaS & StartUp HTML Template
	Author: https://themexriver.com/
	Version: 1.0
*/


(function ($) {
"use strict";


/* 
	lenis-smooth-scroll-activation
*/
const lenis = new Lenis({
	duration: .3,
	easing: (t) => 1 - Math.pow(1 - t, 4),
	direction: 'vertical', 
	smooth: true, 
	smoothTouch: false, 
});
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
$('a[href^="#"]').on('click', function (e) {
	e.preventDefault(); 

	const target = $(this.getAttribute('href')); 

	if (target.length) {
		lenis.scrollTo(target[0], {
			duration: 1.2, 
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
		});
	}
});


gsap.config({
	nullTargetWarn: false,
});

/* 
	sticky-header-function
*/

function waStickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.wa_sticky_header');
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass('wa_sticky');
      } else {
        $header.removeClass('wa_sticky');
        $header.removeClass('wa_sticky_show');
      }

      if ($header.hasClass('wa_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('wa_sticky_show');
        } else {
          $header.removeClass('wa_sticky_show');
        }
      }

      lastScrollTop = windowTop;
    });
}

waStickyHeader();




/* 
	offcanvas-function
*/

$('.offcanvas_toggle').on('click', function() {
    $('.wa-overly, .offcanvas_box_active').addClass('active');
});

$('.wa-overly, .offcanvas_box_close').on('click', function() {
    $('.offcanvas_box_active').removeClass('active');
    $('.wa-overly').removeClass('active');
});

$(document).on('keydown', function(event) {
    if (event.key === 'Escape') {
        $('.offcanvas_box_active').removeClass('active');
        $('.wa-overly').removeClass('active');
    }
});

$('.offcanvas_box_active a').on('click', function() {
    $('.offcanvas_box_active').removeClass('active'); 
    $('.wa-overly').removeClass('active'); 
});


/* 
	mobile-dropdown-function
*/

jQuery(".mobile-main-navigation li.dropdown").append('<span class="dropdown-btn"><i class="fa-solid fa-angle-right"></i></span>'),
	jQuery(".mobile-main-navigation li .dropdown-btn").on("click", function () {
		jQuery(this).hasClass("active")
		? (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"), jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle())
		: (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"),
			jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle(),
			jQuery(this).toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").slideToggle());
});


/* 
	search-popup-function
*/

$('.search_btn_toggle').on('click', function() {
    $('.wa-overly, .search_box_active').addClass('active');
});

$('.wa-overly, .search_box_close').on('click', function() {
    $('.search_box_active').removeClass('active');
    $('.wa-overly').removeClass('active');
});

$(document).on('keydown', function(event) {
    if (event.key === 'Escape') {
        $('.search_box_active').removeClass('active');
        $('.wa-overly').removeClass('active');
    }
});




/* 
	windows-load-function
*/


window.addEventListener('load', function(){


	if (document.querySelectorAll(".xr-preloader").length) {
		const loader = document.querySelector(".xr-preloader");
		
		setTimeout(() => {
			loader.classList.add("loaded");
			afterPreloader();
		});
		setTimeout(function () {
			loader.remove();
		}, 1500);

	} else {
		afterPreloader();
	}

	afterPageLoad();

})


CustomEase.create("ease1", ".18,.82,.41,1");
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* 
	after-preloader-start
*/
function afterPreloader() {


	/* 
		only-LTR-direction
	*/
	if (getComputedStyle(document.body).direction !== "rtl") {
		// title-animation
		function wa_split_text() {

			var wa_st = $(".wa-split-text");
			if (wa_st.length === 0) return;

			gsap.registerPlugin(SplitText, ScrollTrigger);

			wa_st.each(function (index, wa_el) {

				var wa_els = wa_el;

				const wa_split = new SplitText(wa_els, {
					type: "lines, words, chars",
					lineThreshold: 0.5,
					linesClass: "split-line",
				});

				var split_type_set = wa_split.chars;

				gsap.set(wa_els, { perspective: 400 });

				var settings = {
					scrollTrigger: {
						trigger: wa_els,
						toggleActions: "play none none none",
						start: "top 86%",
						once: true,
						markers: false,
					},
					duration: 0.35,
					stagger: 0.02,
					ease: "expo.out",
				};

				if ($(wa_el).hasClass("split-in-fade")) {
					settings.opacity = 0;
				}
				if ($(wa_el).hasClass("split-in-right")) {
					settings.opacity = 0;
					settings.x = 50;
				}
				if ($(wa_el).hasClass("split-in-left")) {
					settings.opacity = 0;
					settings.x = -50;
				}
				if ($(wa_el).hasClass("split-in-up")) {
					settings.opacity = 0;
					settings.y = 80;
				}
				if ($(wa_el).hasClass("split-in-down")) {
					settings.opacity = 0;
					settings.y = -80;
				}
				if ($(wa_el).hasClass("split-in-rotate")) {
					settings.opacity = 0;
					settings.rotateX = 50;
				}
				if ($(wa_el).hasClass("split-in-scale")) {
					settings.opacity = 0;
					settings.scale = 0.5;
				}

				if ($(wa_el).hasClass("split-line-up")) {

					wa_split.split({ type: "words" });
					split_type_set = wa_split.words;

					$(split_type_set).each(function (i, elw) {
						gsap.from(elw, {
							autoAlpha: 0,
							duration: 1,
							transform: "rotateX(80deg) translateY(80px)",
							delay: 0.25 + i * 0.065,
							ease: "expo.out",
							transformOrigin: "center bottom",
							scrollTrigger: {
								trigger: wa_el,
								start: "top 86%",
								toggleActions: "play none none none",
							},
						});
					});

				}

				if ($(wa_el).hasClass("split-up")) {

					wa_split.split({ type: "words" });
					split_type_set = wa_split.words;

					$(split_type_set).each(function (i, elw) {
						gsap.from(elw, {
							opacity: 0,
							duration: 0.65,
							y: 40,
							rotate: 10,
							transformOrigin: "bottom right",
							filter: "blur(5px)",
							delay: 0.25 + i * 0.065,
							ease: "expo.out",
							scrollTrigger: {
								trigger: wa_el,
								start: "top 86%",
								toggleActions: "play none none none",
							},
						});
					});

				}
				else if ($(wa_el).hasClass("split-words-scale")) {
					let atDelay = parseFloat(wa_el.getAttribute("data-delay")) || 0;

					wa_split.split({ type: "words" });
					split_type_set = wa_split.words;

					gsap.set(split_type_set, {
						opacity: 0,
						scale: (i) => (i % 2 === 0 ? 0 : 2),
						force3D: true,
					});

					gsap.to(split_type_set, {
						scrollTrigger: {
							trigger: wa_el,
							toggleActions: "play reverse play reverse",
							start: "top 86%",
						},
						rotateX: 0,
						scale: 1,
						opacity: 1,
						stagger: 0.03,
						delay: atDelay,
					});

				}
				else {
					var wa_anim = gsap.from(split_type_set, settings);

					if ($(wa_el).hasClass("hover-split-text")) {
						$(wa_el).on("mouseenter", function () {
							wa_anim.restart();
						});
					}
				}

			});
		}
		wa_split_text();

		/* 
			hero-4-title-animation
		*/
		if($(".wa-split-up-1").length) {
			var wa_split_up_1 = $(".wa-split-up-1");
			if(wa_split_up_1.length == 0) return; gsap.registerPlugin(SplitText); wa_split_up_1.each(function(index, el) {

				el.split = new SplitText(el, { 
					type: "lines,words,chars",
					linesClass: "split-line",
				});

				let delayValue = $(el).attr("data-split-delay") || "0s";
				delayValue = parseFloat(delayValue) || 0; 

				if( $(el).hasClass('wa-split-up-1') ){
					gsap.set(el.split.chars, {
						scaleY: 1.5, 
						rotate: 10,
						opacity: 0,
					});
				}

				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						toggleActions: 'play none none reverse',
					},
					opacity: 1,
					scaleY: 1, 
					rotate: 0,
					duration: .6,
					ease: "expo.out",
					stagger: -0.08,
					delay: delayValue, 
				});

			});
		}


		// home-3-title-animation
		document.querySelectorAll(".wa_title_spilt_1").forEach((atEl) => {
			const atSplit = new SplitText(atEl, {
				type: "words,chars",
				wordsClass: "word",
				charsClass: "char"
			});

			let atDuration = parseFloat(atEl.getAttribute("data-speed")) || .7;
			let atDelay = parseFloat(atEl.getAttribute("data-delay")) || 0;

			if (window.innerWidth <= 768) {
				atDuration = atDuration * 0.3; 
			}

			gsap.set(atSplit.words, {
				willChange: "transform",
				perspective: 1000,
				transformStyle: "preserve-3d"
			});

			gsap.set(atSplit.chars, {
				willChange: "transform",
				opacity: 0,
				x: 30,
				rotateZ: -45,
				rotateY: -90,
				transformOrigin: "center center -10px"
			});

			gsap.set(atEl, {
				perspective: 1000,
				transformStyle: "preserve-3d"
			});

			gsap.to(atSplit.chars, {
				scrollTrigger: {
					trigger: atEl,
					start: "top 86%",
					toggleActions: 'play none none reverse',
				},
				opacity: 1,
				x: 0,
				rotateZ: 0,
				rotateY: 0,
				duration: atDuration,
				delay: atDelay,
				ease: "ease1",
				// stagger: .03,
				stagger: {
					each: 0.03,
					from: "left",
					grid: "auto",
				},
			});
		});
		
		
	}	


	

	// hero-1-features-list
	if($(".xr-hero-1-features-list").length) {
		const items = document.querySelectorAll(".xr-hero-1-features-list li");
		let current = 0;
	
		setInterval(() => {
			items[current].classList.remove("active");
			current++;
			if (current >= items.length) {
				current = 0;
			}
			items[current].classList.add("active");
		}, 3000);
	}

	// hero-1-tl-1
	let hero1tl1 = gsap.timeline()
	hero1tl1.from(".xr-hero-1-img", {
		y: 50,
		autoAlpha: 0,
		duration: 1,
		ease: "expo.out",
		delay: 1,
	})
	hero1tl1.from(".xr-hero-1-top-disc", {
		y: 50,
		autoAlpha: 0,
		duration: 1,
		ease: "expo.out",

	},"<30%")
	hero1tl1.from(".xr-hero-1-circle-btn", {
		y: 50,
		autoAlpha: 0,
		duration: 1,
		ease: "expo.out",
	},"<30%")
	hero1tl1.from(".xr-hero-1-features-list", {
		y: 50,
		autoAlpha: 0,
		duration: 1,
		ease: "expo.out",
	},"<30%")
	hero1tl1.from(".xr-hero-1-author", {
		y: 50,
		autoAlpha: 0,
		duration: 1,
		ease: "expo.out",
	},"<30%")


	// hero-2-tl
	let hero2tl1 = gsap.timeline()
	hero2tl1.from(".xr-hero-2-bg-img-single", {
		yPercent: 100,
		autoAlpha: 0,
		duration: 1,
		ease: "expo.out",
		delay: .7,
	})
	hero2tl1.from(".xr-hero-2-title", {
		y: 50,
		autoAlpha: 0,
		duration: 1,
		ease: "expo.out",
		delay: .4,
	})
	hero2tl1.from(".xr-hero-2-video", {
		y: 50,
		x: -50,
		autoAlpha: 0,
		duration: 1,
		ease: "expo.out",
	},"<50%")
	hero2tl1.from(".xr-hero-2-disc", {
		y: 50,
		autoAlpha: 0,
		duration: 1,
		ease: "expo.out",
	},"<20%")
	hero2tl1.from(".xr-hero-2-right", {
		xPercent: 100,
		duration: 1,
		ease: "expo.out",
	},"<20%")



	// hero-3-slider
	if ($('.xr_h3_preview_slider').length) {

		const xr_h3_preview_slider = new Swiper('.xr_h3_preview_slider', {
			loop: true,
			speed: 1000,
			slidesPerView: 3,
			direction: 'vertical',
			spaceBetween: 5,
	

		});


		let as_h3_main_slider = new Swiper('.as_h3_main_slider', {
			loop: true,
			speed: 1000,
			effect: "fade",
			fadeEffect: {
				crossFade: true
			},
			// autoplay: { delay: 6000 },
			thumbs: {
				swiper: xr_h3_preview_slider,
			},
		});
	
	}
	
	// hero-3-tl
	let hero3tl1 = gsap.timeline()
	hero3tl1.from(".xr-video-3-elm", {
		yPercent: 50,
		autoAlpha: 0,
		duration: 1,
		ease: "expo.out",
		delay: 1.4,
	})

	
/* 
	after-preloader-end
*/
}







// services-1-slider
if ($('.cx_services_1_slider').length) {

	const cx_services_1_slider = new Swiper('.cx_services_1_slider', {
		loop: true,
		speed: 500,
		slidesPerView: "auto",
		spaceBetween: 24,
		// autoplay: { delay: 3000 },

	});
  
}























/* 
	after-page-load-start
*/
function afterPageLoad() {

	/* 
		add-active-class
	*/
	const waAddClass = gsap.utils.toArray('.wa_add_class');
	waAddClass.forEach(waAddClassItem => {
		gsap.to(waAddClassItem, {
			scrollTrigger: {
				trigger: waAddClassItem,
				start: "top 90%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				toggleClass: "active",
				once: true,
				markers: false,
			}
		});
	});



	/* 
		wow-activation
	*/
	if($('.wow').length){
		var wow = new WOW({
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       50,
			mobile:       true,
			live:         true
		});
		wow.init();
	};




		

/* 
	after-page-load-start
*/
}


// wa-bg-parallax
gsap.utils.toArray(".wa_parallax_bg").forEach(element => {
	gsap.fromTo(
		element,
		{ backgroundPosition: "50% 0%" }, 
		{ 
			backgroundPosition: "50% 100%", 
			ease: "none",
			scrollTrigger: {
				trigger: element,
				scrub: 1,    
				markers: false,  
			},
		}
	);
});

// wa-parallax-img
gsap.utils.toArray(".wa_parallax_img").forEach(element => {
	gsap.fromTo(
		element,
		{ objectPosition: "50% 110%" }, 
		{ 
			objectPosition: "50% 0%", 
			ease: "none",
			scrollTrigger: {
				trigger: element,
				scrub: true,    
				markers: false,     
			},
		}
	);
});

// wa_zoomOut_img
gsap.utils.toArray(".wa_zoomOut_img").forEach(wa_zoomOut_img => {
	gsap.fromTo(
		wa_zoomOut_img,
		{ scale: 1.15 }, 
		{ 
			scale: 1, 
			ease: "power1.inOut",
			duration: .5,
			scrollTrigger: {
				trigger: wa_zoomOut_img,
				start: "top 70%",
				markers: false,     
			},
		}
	);
});

	
if ($(".wa_magnetic_btn_3").length) {
    var waMagnets3 = document.querySelectorAll('.wa_magnetic_btn_3');
    var waStrength3 = 100;

    waMagnets3.forEach((magnet) => {
        magnet.addEventListener('mousemove', moveMagnet3);
        magnet.addEventListener('mouseout', function(event) {
            const innerElements = event.currentTarget.querySelectorAll('.wa_magnetic_btn_3_elm');
            innerElements.forEach((elm) => {
                gsap.to(elm, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    });

    function moveMagnet3(event) {
        var magnetButton = event.currentTarget;
        var bounding = magnetButton.getBoundingClientRect();
        const innerElements = magnetButton.querySelectorAll('.wa_magnetic_btn_3_elm');

        const xMove = (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * waStrength3;
        const yMove = (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * waStrength3;

        innerElements.forEach((elm) => {
            gsap.to(elm, {
                x: xMove,
                y: yMove,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        });
    }
}



/* 
	header-1-toggle
*/
$(".xr-header-1-menu-toggle-btn").on("click", function () {
	$(this).toggleClass("active"); 

	$(".xr-header-1-menu").toggleClass("show"); 
});

/* 
	testimonial-1-slider-active
*/
if ($('.xr_t1_main_slider').length) {

	const xr_t1_main_slider = new Swiper('.xr_t1_main_slider', {
		loop: true,
		speed: 700,
		slidesPerView: 1,

		effect: "fade",
		fadeEffect: { crossFade: true },


		navigation: {
			nextEl: ".xr_t1_next",
			prevEl: ".xr_t1_prev",
		},

		autoplay: { delay: 4000 },

		on: {
			slideChangeTransitionStart: function () {
			  const previewContainer = document.querySelector(".xr-testimonial-1-slider-preview");
			  const imgs = previewContainer.querySelectorAll("img");
		
			  previewContainer.classList.remove("is_class_fade");
			  void previewContainer.offsetWidth; 
			  previewContainer.classList.add("is_class_fade");
		
			  const srcs = Array.from(imgs).map((img) => img.getAttribute("src"));
		
			  const shuffled = srcs.sort(() => Math.random() - 0.5);
		
			  imgs.forEach((img, i) => {
				img.setAttribute("src", shuffled[i]);
			  });
			},
		  },


	});
  
}
  

/* 
	Achievements-1-handshake-video
*/
if ($(".hand-video").length) {
	const video = document.querySelector(".hand-video video");
  
	const observer = new IntersectionObserver(
	  (entries) => {
		entries.forEach((entry) => {
		  if (entry.isIntersecting) {
			video.play();
		  } else {
			video.pause();
		  }
		});
	  },
	  {
		threshold: 0.5
	  }
	);
  
	observer.observe(video);
}


// price-1-heart-shape
gsap.utils.toArray(".xr-price-1-card-single-ani .smoke").forEach((smoke, i) => {
    gsap.fromTo(smoke,
        {
            y: 15,
            opacity: 1,
            scale: 1
        },
        {
            y: -75,
            opacity: 0,
            scale: 8,
            duration: 5,
            repeat: -1,
            delay: i * 0.8,
            ease: "power1.out"
        }
    );
});

// price-1-big-title
let skPrice3title = gsap.timeline({
	scrollTrigger: {
		trigger: ".xr-price-1-big-title",
		start: "top 90%", 
		end: "top 40%",
		toggleActions: "play none none reverse",
		scrub: true,
		markers: false,
	},
});
skPrice3title.from(".xr-price-1-big-title", { y: 100 });

/* 
	price-1-toggle-class
*/
if($(".xr-price-1-toggle-btn").length) {
	$('.xr-price-1-toggle-btn').on('click', function () {
		$(".xr-price-1-toggle").toggleClass('active');
		$(".xr-price-1-toggle-btn").toggleClass('active');
		$('.xr-price-1-card-single .price-box').toggleClass('active');
	});
}

// team-1-animation
if (window.matchMedia("(min-width: 1600px)").matches) {
	if($("#teamPath").length) {
		const members1 = gsap.utils.toArray(".xr-team-1-member");
		const circle = document.querySelector("#teamPath");
		const members1_content = members1.map(member => member.querySelector(".content-wrap"));
		const members1_social = members1.map(member => member.querySelector(".team-social"));
	
		let team1tl1 = gsap.timeline({
		scrollTrigger: {
			trigger: ".xr-team-1-height",
			start: "top 50%",
			end: "bottom center",
			scrub: true,
		}
		});
		gsap.set(members1, {
			autoAlpha: 0
		});
	
		
		team1tl1.from(members1, {
			stagger: 0.2,
			ease: "power3.out",
			keyframes: [
				{
					motionPath: {
						path: circle,
						align: circle,    
						alignOrigin: [0.5, 0.5]
					},
					autoAlpha: 1,
					duration: 2
				},
			],
		});
		
		team1tl1.to(members1, {
			x: 0,
		});
		
		team1tl1.from(members1_content, {
			y: -50,
			autoAlpha: 0
		});
		
		team1tl1.fromTo(members1_social, {
			visibility: "hidden"
		}, {
			visibility: "visible"
		});
	
		let team1tl2 = gsap.timeline({
			scrollTrigger: {
			trigger: ".xr-team-1-height",
			start: "top 100%",
			end: "bottom center",
			scrub: true,
			markers: false,
			}
		});
		team1tl2.from(".xr-team-1-big-title-text", {
			yPercent: 110,
		});
	}
	
}


// choose-1-slider
if ($('.xr_ch1_main_slider').length) {

	const xr_ch1_main_slider = new Swiper('.xr_ch1_main_slider', {
		loop: true,
		speed: 1000,
		slidesPerView: 1,

		effect: "fade",
		fadeEffect: { crossFade: true },

		autoplay: { delay: 3000 },

	});
  
}

// choose-1-big-title
if (window.matchMedia("(min-width: 1600px)").matches) { 
	let choose1tl1 = gsap.timeline({
		scrollTrigger: {
			trigger: ".xr-choose-1-wrap",
			start: "top 70%", 
			end: "top 0%",
			toggleActions: "play none none reverse",
			markers: false,
		},
	});
	choose1tl1.from(".xr-choose-1-card-bg-shape svg .group-1 rect", { xPercent: -100 });
	choose1tl1.from(".xr-choose-1-card-bg-shape svg .group-2 rect", { xPercent: 100},"<");
	choose1tl1.from(".xr-choose-1-card-single", { autoAlpha: 0, });
}

// projects-1-animation 
if (window.matchMedia("(min-width: 1600px)").matches) { 
	if($(".xr-projects-1-height").length) {
		const project1height = document.querySelector(".xr-projects-1-height");
		const project1ItemImgList = document.querySelectorAll(".xr-projects-1-big-img-single");
	
		project1height.style.height = `${project1ItemImgList.length * 100}vh`; 
	
		const project1number = document.querySelectorAll(".xr-projects-1-number .single-number");
		const project1numberLength = project1number.length;  
		const eachStep2 = 1 / project1numberLength;
	
		ScrollTrigger.create({
		trigger: ".xr-projects-1-height",
		start: "top top",
		end: "bottom bottom",
		scrub: true,
		onUpdate: (self) => {
	
			let progress = self.progress;
			let index = Math.min(
			project1numberLength - 1,
			Math.floor(progress * project1numberLength)
			);
	
			project1number.forEach(num => num.classList.remove("active"));
			project1number[index].classList.add("active");
		}
		});
	
	
		const project1img = document.querySelectorAll(".xr-projects-1-big-img-single");
		const project1imgLength = project1img.length;  
	
	
		var projects1imgTl = gsap.timeline({
			scrollTrigger: {
				trigger: ".xr-projects-1-height",
				start: "top top",
				end: "bottom bottom",
				scrub: true,
			},
		});
		projects1imgTl.to(".xr-projects-1-big-img-single:not(:last-child)", {
			height: 0,
			stagger: 1,
		});
	
		var projects1imgTl = gsap.timeline({
			scrollTrigger: {
				trigger: ".xr-projects-1-height",
				start: "top top",
				end: "bottom bottom",
				scrub: true,
			},
		});
		projects1imgTl.to(".xr-projects-1-card-wrap", {
			y: (i, el) => -(el.offsetHeight - 434)
		});
	}

}



// client-1-animation
if($(".xr-client-1-logo").length) {
	function randomActive() {
		const logos = document.querySelectorAll('.xr-client-1-logo');
		
		logos.forEach(logo => logo.classList.remove('active'));
		
		const randomIndex = Math.floor(Math.random() * logos.length);
		
		logos[randomIndex].classList.add('active');
	}
	
	setInterval(randomActive, 2000);
}

// step-1-animation
if (window.matchMedia("(min-width: 1600px)").matches) { 
	if($(".xr-step-1-height").length) {
		const step1height = document.querySelector(".xr-step-1-height");
		const stepItemList = document.querySelectorAll(".xr-step-1-card-single");
	
		step1height.style.height = `${stepItemList.length * 100}vh`; 
	
		let step1tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: step1height,
				start: "top 70%",
				end: "bottom bottom",
				scrub: true,
			}
		});
		
		step1tl1.from(stepItemList, {
			transform: "translate3d(0px, 0px, 0px) rotate(20deg) rotateY(300deg) rotateX(100deg) scale(0, 0)",
			stagger: 1,
		})
		
	}
}

// testimonial-1-animation
if (window.matchMedia("(min-width: 1600px)").matches) {  
	let testimonial1tl1 = gsap.timeline({
		scrollTrigger: {
			trigger: ".xr-testimonial-1-bg-circle",
			start: "top 70%",
			end: "bottom bottom",
			scrub: true,
			markers: false,
		}
	});
	
	testimonial1tl1.from(".xr-testimonial-1-bg-circle .circle-elm", {
		scale: 2,
	})
	
}


// client-2-slider
if ($('.xr_client2_slider').length) { 
	var xr_client2_slider = new Swiper(".xr_client2_slider", {
		slidesPerView: 6,
		spaceBetween: 30,
		loop: true,
		speed: 1000,
		autoplay: { delay: 4000 },
		
		navigation: {
			nextEl: ".xr_client2_next",
			prevEl: ".xr_client2_prev",
		},
		

		breakpoints: {
		  320: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 2,
		  },
		  768: {
			slidesPerView: 3,
		  },
		  992: {
			slidesPerView: 5,
		  },
		  1200: {
			slidesPerView: 6,
		  },
		},
	});
}

// projects-2-gallery
if($(".xr-projects-2-gallery").length) {
	const gallery = document.querySelector(".xr-projects-2-gallery");
	function autoRotate() {
	
		const cards = document.querySelectorAll(".xr-projects-2-gallery-img-ani");
		const first = cards[0];
	
		gsap.to(first, {
			rotateY: -79,
			x: -118,
			z: 80,
			opacity: 0,
			duration: 1.2,
			ease: "expo.inOut",
			onComplete: () => {
	
				gsap.set(first, {
					rotateY: 0,
					x: 0,
					z: 0,
					opacity: 1
				});
	
				gallery.appendChild(first);
			}
		});
	}
	
	setInterval(autoRotate, 3000);
}


// projects-2-scroll-animation
if (window.matchMedia("(min-width: 1400px)").matches) {  
	let p2scrollAnimation = gsap.timeline({
		scrollTrigger: {
			trigger: ".xr-projects-2-top-inner",
			start: "top 80%",
			end: "top 20%",
			scrub: true,
			markers: false,
		}
	});
	
	p2scrollAnimation.from(".xr-projects-2-top-inner .elm-box:nth-of-type(1)", {
		x: 215,
	})
	p2scrollAnimation.from(".xr-projects-2-top-inner .elm-box:nth-of-type(2)", {
		scale: 0,
	},"<")
	p2scrollAnimation.from(".xr-projects-2-top-inner .elm-box:nth-of-type(3)", {
		x: -215,
	},"<")

	
}


/* 
	progress-animation
*/
const wa_progress_ani = document.querySelectorAll('.wa_progress_ani');
wa_progress_ani.forEach((elm) => {
	gsap.from(elm, {
		width: "0",
		duration: 2,
		ease: "power1.inOut",

		scrollTrigger: {
			trigger: elm,
			start: "top 90%",   
			toggleActions: "play none none reverse",
		}
	});
});

// about-2-svg-animation
if($(".xr-about-2-bg-line").length) {
	const path = document.querySelector(".xr-about-2-bg-line .draw-line");
	const pathLength = path.getTotalLength();
	
	gsap.set(path, {
	  strokeDasharray: pathLength,
	  strokeDashoffset: pathLength
	});
	
	gsap.to(path, {
	  strokeDashoffset: 0,
	  ease: "none",
	  scrollTrigger: {
		trigger: ".xr-about-2-bg-line",
		start: "top 80%",
		end: "bottom 20%",
		scrub: true
	  }
	});
}

// projects-2-svg-animation
if($(".xr-projects-2-counter .line-shape").length) {
	const path = document.querySelector(".xr-projects-2-counter .line-shape .svg-path");
	const pathLength = path.getTotalLength();
	
	gsap.set(path, {
	  strokeDasharray: pathLength,
	  strokeDashoffset: pathLength
	});
	
	gsap.to(path, {
	  strokeDashoffset: 0,
	  ease: "none",
	  duration: 2,
	  scrollTrigger: {
		trigger: ".xr-projects-2-counter .line-shape ",
		start: "top 80%",
		end: "bottom 20%",
		// scrub: true
	  }
	});
}


// video-2-animation
if (window.matchMedia("(min-width: 1400px)").matches) {  
	let video2tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".xr-video-2-area",
			start: "top top",
			end: "bottom bottom",
			scrub: true,
			markers: false,
		}
	});
	
	video2tl.to(".xr-video-2-wrap-inner", {
		width: "100%",
		height: "100vh"
	})
	
	
	video2tl.from(".xr-video-2-item img", {
		scale: 2,
	},"<")
	
	
	video2tl.to(".xr-video-2-item", {
		borderRadius: "0px",
	},"<")
	
}


// testimonial-2-animation
if (window.matchMedia("(min-width: 1600px)").matches) {
	if($(".xr-testimonial-2-card").length) {
  
		const t2cards = gsap.utils.toArray(".xr-testimonial-2-card");
	
		gsap.set(t2cards, { pointerEvents: "none" });
	
		// Scroll Animation
		gsap.from(t2cards, {
		x: 300,
		rotate: -10,
		autoAlpha: 0,
		duration: 0.5,
		ease: "power3.out",
		stagger: 0.1,
		scrollTrigger: {
			trigger: ".xr-testimonial-2-wrap",
			start: "top 80%",
		},
		onComplete: initHover   
		});
	
		// Hover Function
		function initHover() {
		gsap.set(t2cards, { pointerEvents: "auto" });
	
		t2cards.forEach((card, index) => {
	
			card.addEventListener("mouseenter", () => {
	
			t2cards.forEach((item, i) => {
	
				item.style.transition = "all 0.4s ease";
	
				if (i === index) {
				item.style.transform = "rotate(0deg) translateX(0px)";
				item.style.zIndex = "5";
				} 
				else if (i < index) {
				item.style.transform = "rotate(-4deg) translateX(-70px)";
				item.style.zIndex = "1";
				} 
				else {
				item.style.transform = "rotate(4deg) translateX(70px)";
				item.style.zIndex = "1";
				}
	
			});
	
			});
	
			card.addEventListener("mouseleave", () => {
	
			t2cards.forEach((item, i) => {
	
				item.style.zIndex = "1";
	
				if (i % 2 === 0) {
				item.style.transform = "rotate(-4deg) translateX(0px)";
				} else {
				item.style.transform = "rotate(4deg) translateX(0px)";
				}
	
			});
	
			});
	
		});
	
		}

	}
}

// skill-2-animation
if (window.matchMedia("(min-width: 1400px)").matches) { 
	let skill2img = gsap.timeline({
		scrollTrigger: {
			trigger: ".xr-skill-2-img",
			start: "top 100%", 
			end: "top 20%", 
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});
	skill2img.to(".xr-skill-2-img img", { y: -60 });
}


// home-3-subtitle
if ($(".xr-subtitle-3").length) {
    gsap.utils.toArray(".xr-subtitle-3").forEach((item) => {
        const line = item.querySelector(".xr-subtitle-3-line");
        const text = item.querySelector(".xr-subtitle-3-text");

        gsap.set(line, {
            scaleX: 0,
            transformOrigin: "left center"
        });
        gsap.set(text, {
            x: -90,
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
            }
        })
        .to(line, {
            scaleX: 1,
            duration: 1,
            ease: "power2.out"
        })
        .to(text, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, "<");

    });

}

// video-3-animation
if (window.matchMedia("(min-width: 1920px)").matches) { 
	let video3tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".xr-video-3-area",
			start: "top 90%", 
			end: "top 0%",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});
	video3tl.from(".xr-video-3-elm ", { width: 766, height: 330, x: 178, y: -362, borderRadius: "16px" });
}
if (window.matchMedia("(max-width: 1919px) and (min-width: 1600px)").matches) { 
	let video3tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".xr-video-3-area",
			start: "top 90%", 
			end: "top 0%",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});
	video3tl.from(".xr-video-3-elm ", { width: 600, height: 330, x: 30, y: -362, borderRadius: "16px" });
}


// video-3-play-pause
if (document.querySelector(".xr-video-3-area")) {
    const videoSection = document.querySelector(".xr-video-3-area");
    const video = videoSection.querySelector("video");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.3 
    });
    observer.observe(videoSection);
}

// showcase-3-animation
if (window.matchMedia("(min-width: 1200px)").matches) {
	if($(".xr-showcase-3-img-single").length) {
		// first-step
		const items = gsap.utils.toArray(".xr-showcase-3-img-single");
		const total = items.length;
		const radius = 470;
	  
		items.forEach((item, i) => {
		  const angle = (i / total) * Math.PI * 2;
	  
		  gsap.set(item, {
			x: Math.cos(angle) * radius,
			y: Math.sin(angle) * radius,
			opacity: i === 0 ? 1 : 0,
			rotation: angle * 180 / Math.PI
		  });
		});
	  
		const s3imgLt = gsap.timeline({
		  scrollTrigger: {
			trigger: ".xr-showcase-3-area",
			start: "top 40%",
			markers: false,
		  },

		  onComplete: () => {
			$(".xr-showcase-3-wrap").addClass("active");
			}
		});
	  
		s3imgLt.from(".xr-showcase-3-img", {
		  rotation: -450,
		  duration: 2,
		});
	  
		s3imgLt.to(items.slice(1), {
		  opacity: 1,
		  duration: .5,
		  stagger: -.1,
		}, "<");
	  
		s3imgLt.from(".xr-showcase-3-content", {
		  autoAlpha: 0,
		  scale: .5,
		  duration: .5,
		},"<50%");


		// second-step
		const s3imgLt2 = gsap.timeline({
			scrollTrigger: {
			  trigger: ".xr-showcase-3-img",
			  start: "top 0%",
			  scrub: true,
			  markers: false,
			}
		});
	
		s3imgLt2.to(".xr-showcase-3-img-wrap", {
			rotation: -180,
		});



		const wrap = document.querySelector(".xr-showcase-3-img");
		const content = document.querySelector(".xr-showcase-3-content");

		content.addEventListener("mouseenter", () => {
			wrap.classList.add("hovered");
		});

		content.addEventListener("mouseleave", () => {
			wrap.classList.remove("hovered");
		});
	}
  
}


// about-3-slider
if ($('.xr-about-3-features-title-slider').length) {

	var kk_a1f_content_slider_active = new Swiper(".xr-about-3-features-content-slider", {
		slidesPerView: 1,
		speed: 500,
		effect: "fade",
		fadeEffect: {
			crossFade: true
		},

	});
	var kk_a1f_slider_active = new Swiper(".xr-about-3-features-title-slider", {
		effect: "creative",
		slidesPerView: "auto",
		creativeEffect: {
			next: {
				shadow: false,
				translate: ["29%", 0, 0],
			},
			limitProgress: 3,
		},

		thumbs: {
			swiper: kk_a1f_content_slider_active,
		},

	});

}

if (window.matchMedia("(min-width: 1400px)").matches) { 
	let about3tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".xr-about-3-area",
			start: "top 90%", 
			end: "top top",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});
	about3tl.from(".xr-about-3-img-3", { x: 200, y: -900, rotate: 40, });
}



// projects-3-animation
if (window.matchMedia("(min-width: 1200px)").matches) {
	if($(".xr-projects-3-height").length) {
		function initStackCards() {

			const area = document.querySelector('.xr-projects-3-height');
			const cards = gsap.utils.toArray('.xr-projects-3-card-single');

			area.style.height = `${cards.length }00vh`;
		
			cards.forEach((card, index) => {
				card.style.zIndex =  index;
			});

			let projects3tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".xr-projects-3-height",
					start: "top top", 
					end: "bottom bottom",
					toggleActions: "play none none reverse",
					scrub: true,
					markers: false,
				},
			});
			projects3tl.from(cards.slice(1), { 
				rotate: 90,
				stagger: 1,
			});

		}
		
		initStackCards();
	}
}


// step-3-animation
if (window.matchMedia("(min-width: 1200px)").matches) {
	if ($(".xr-step-3-area").length) {

		const cards = gsap.utils.toArray(".xr-step-3-card-single");
		const area = document.querySelector(".xr-step-3-area");
		area.style.height = `${cards.length * 100 - 100}vh`;

		gsap.set(cards, { 
			yPercent: 120,
			autoAlpha: 0
		});

		gsap.set(cards[0], { 
			yPercent: 0,
			autoAlpha: 1
		});

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: area,
				start: "top top",
				end: "bottom bottom",
				scrub: true,
			}
		});

		cards.forEach((card, i) => {

			if (i === 0) return;

			tl.to(card, {
				yPercent: 0,
				autoAlpha: 1,
				duration: 1
			})

			.to(cards[i - 1], {
				scale: 0.8,
				filter: "blur(6px)",
				autoAlpha: 0,
				duration: 1
			}, "<10%"); 
		});

	}

}



// contact-3-testimonial
if (window.matchMedia("(min-width: 1400px)").matches) { 

	if ($(".xr-contact-3-right").length) {

		const wrapper = document.querySelector(".xr-contact-3-right");
		const movingDiv = document.querySelector(".xr-contact-3-slider-main");
	
		wrapper.addEventListener("mousemove", (e) => {
	
			const rect = wrapper.getBoundingClientRect();
	
			const xPercent = (e.clientX - rect.left) / rect.width - 0.6;
			const yPercent = (e.clientY - rect.top) / rect.height - 0.5;
	
			const moveX = xPercent * 800; 
			const moveY = yPercent * 550;
	
			gsap.to(movingDiv, {
				x: moveX,
				y: moveY,
				duration: 0.4,
				ease: "power2.out"
			});
	
		});
	
		wrapper.addEventListener("mouseleave", () => {
			gsap.to(movingDiv, {
				x: 0,
				y: 0,
				duration: 0.7,
				ease: "power3.out"
			});
		});
	
	}
}


// contact-3-testimonial-slider
if ($('.xr_c3_slider_img').length) {

	var xr_c3_slider_img = new Swiper(".xr_c3_slider_img", {
		loop: true,
		slidesPerView: 1,
		speed: 500,
		effect: "fade",
		fadeEffect: {
			crossFade: true
		},



	});
	var xr_c3_slider_card = new Swiper(".xr_c3_slider_card", {
		loop: true,
		speed: 800,
		thumbs: {
			swiper: xr_c3_slider_img,
		},
		autoplay: { delay: 3000 },
	});

}








if($(".wa_hover_class_toggle").length) {
    const wa_hover_class = document.querySelectorAll(".wa_hover_class_toggle");
    const defaultActive = document.querySelector(".wa_hover_class_toggle.active");
    wa_hover_class.forEach(card => {
        card.addEventListener("mouseenter", function () {
            wa_hover_class.forEach(c => c.classList.remove("active"));
            this.classList.add("active");
        });
        card.addEventListener("mouseleave", function () {
            wa_hover_class.forEach(c => c.classList.remove("active"));
            if (defaultActive) {
                defaultActive.classList.add("active");
            }

        });
    });
};

if ($(".wa_hover_class_toggle_2").length) {
    const wa_hover_class2 = document.querySelectorAll(".wa_hover_class_toggle_2");
    const defaultActive2 = document.querySelector(".wa_hover_class_toggle_2.active");

    wa_hover_class2.forEach(card => {
        card.addEventListener("mouseenter", function () {
            wa_hover_class2.forEach(c => c.classList.remove("active"));
            this.classList.add("active");
        });

        card.addEventListener("mouseleave", function () {
            wa_hover_class2.forEach(c => c.classList.remove("active"));
            if (defaultActive2) {
                defaultActive2.classList.add("active");
            }
        });
    });
}

/* 
    marquee-activation
*/

$('.wa_marquee').each(function () {

	let $this = $(this);

	let speed = $this.data('speed') || 20;
	let direction = $this.data('direction') || 'left';
	let pauseOnHover = $this.data('pause');

	if (pauseOnHover === undefined) {
		pauseOnHover = false;
	}

	$this.marquee({
		speed: speed,
		gap: 0,
		delayBeforeStart: 0,
		startVisible: true,
		direction: direction,
		duplicated: true,
		pauseOnHover: pauseOnHover,
	});

});

/* 
	marquee-down-top 
*/
if ($(".wa_marquee_down_top").length) {
  document.querySelectorAll(".wa_marquee_down_top").forEach((waMarqueeTop) => {
    const waMarqueeClone = waMarqueeTop.cloneNode(true);
    waMarqueeTop.parentNode.appendChild(waMarqueeClone);

    const waMarqueeTotalHeight = waMarqueeTop.offsetHeight;

    gsap.to([waMarqueeTop, waMarqueeClone], {
      y: `-${waMarqueeTotalHeight}px`,
      ease: "none",
      duration: 20,
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((waY) => parseFloat(waY) % waMarqueeTotalHeight),
      },
    });
  });
}


/* 
	marquee-top-down 
*/
if ($(".wa_marquee_top_down").length) { 
	const waMarqueeTopDown = document.querySelector('.wa_marquee_top_down');
	const waMarqueeTopDownClone = waMarqueeTopDown.cloneNode(true);
	waMarqueeTopDown.parentNode.appendChild(waMarqueeTopDownClone);
	
	const waMarqueeTopDownHeight = waMarqueeTopDown.offsetHeight;
	
	gsap.to(".wa_marquee_top_down", {
	  y: `${waMarqueeTopDownHeight}px`, 
	  ease: "none",
	  duration: 20,
	  repeat: -1,
	  modifiers: {
		y: gsap.utils.unitize(waY => parseFloat(waY) % waMarqueeTopDownHeight)
	  }
	});
}


/* 
	wa_parallax_elm
*/ 
if($(".wa_parallax_elm").length) {
	document.addEventListener("mousemove", wa_parallax_handler);
	function wa_parallax_handler(e) {
		const items = document.querySelectorAll(".wa_parallax_elm");
	
		items.forEach((el) => {
			const speed = parseFloat(el.getAttribute("data-value")) || 0;
			const x = (e.clientX * speed) / 250;
			const y = (e.clientY * speed) / 250;
	
			el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
		});
	}
}




/* 
	faqs-active-class
*/
$(document).on('click', '.wa_accordion_item', function () {

	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
	} else {
		$(this).addClass('active').siblings().removeClass('active');
	}

});


// placeholder-typing
document.querySelectorAll(".wa_placeholder").forEach(waPlaceholderInput => {
	const waPlaceholderText = waPlaceholderInput.placeholder; 
	const waStartDelay = waPlaceholderInput.dataset.startDelay ? parseInt(waPlaceholderInput.dataset.startDelay) : 0; 
	let waPlaceholderIndex = 0;
	waPlaceholderInput.placeholder = "";

	const waPlaceholderObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				waPlaceholderType();
				waPlaceholderObserver.unobserve(waPlaceholderInput);
			}
		});
	}, { threshold: 0.5 });

	setTimeout(() => {
		waPlaceholderObserver.observe(waPlaceholderInput);
	}, waStartDelay);

	function waPlaceholderType() {
		if (waPlaceholderIndex < waPlaceholderText.length) {
			waPlaceholderInput.placeholder += waPlaceholderText.charAt(waPlaceholderIndex);
			waPlaceholderIndex++;
			setTimeout(waPlaceholderType, 70); 
		}
	}
});

/* 
	bootstrap-tooltip-activation
*/
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

/* 
	back-to-top-button-function
*/
if ($('.wa_backToTop').length) {
    var scrollTopbtn = document.querySelector('.wa_backToTop');
    var offset = 500; 
    var duration = 1000; 

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset) {
            $(scrollTopbtn).addClass('active');
        } else {
            $(scrollTopbtn).removeClass('active');
        }
    });

    $(scrollTopbtn).on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, duration, 'swing');
    });
}

/* 
	popup-video-activation
*/
if($('.popup_video').length) {
	$('.popup_video').magnificPopup({
		type: 'iframe'
	});
}

/* 
	popup-image-activation
*/
if($('.popup_img').length) {
	$('.popup_img').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
		},
	});
}


/* 
	nice-selector-activation
*/
if($('.nice-select').length) {
	$('.nice-select select').niceSelect();
}


/* 
	background-image-function
*/
$("[data-background]").each(function(){
	$(this).css("background-image","url("+$(this).attr("data-background") + ") ")
})

/* 
    data-mask-image
*/
$('[data-mask-image]').each(function() {
    $(this).css('mask-image', 'url('+ $(this).attr('data-mask-image') + ')');
});


/* 
	counter-activation
*/


if($(".counter").length) {
    $('.counter').counterUp({
        delay: 10,
        time: 5000
    });

    let elements = document.querySelectorAll(".wa-counter");

    elements.forEach(element => {
        let innerWidth = element.clientWidth;
        element.style.width = innerWidth + "px";
    });
}

/*
    odomater-activation
*/

$('.odometer').appear(function () {
    var $this = $(this); 
    var countNumber = $this.attr("data-count");
    $this.html(countNumber);
});


/* 
	current-year-function
*/
if ($('.copyright-year').length) {
    const currentYear = new Date().getFullYear();
    $('.copyright-year').text(currentYear);
}


})(jQuery);