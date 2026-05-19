/*
	Template Name: SaasRiver - SaaS & StartUp HTML Template
	Author: https://themexriver.com/
	Version: 1.0
*/


(function ($) {
"use strict";


/* 
	windows-load-function
*/


window.addEventListener('load', function(){


	if (document.querySelectorAll(".cx-preloader").length) {
		const loader = document.querySelector(".cx-preloader");
		
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




/* 
	after-preloader-start
*/
function afterPreloader() {


	/* 
		only-LTR-direction
	*/
	if (getComputedStyle(document.body).direction !== "rtl") {

		if ($(".wa_btn_split").length) {
			var splitButton2 = $(".wa_btn_split");
			gsap.registerPlugin(SplitText);

			splitButton2.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "words,chars",
				});

				$(el).on("mouseenter", function () {
					el.split.chars.forEach((char, i) => {
						let yValue = i % 2 === 0 ? -50 : 50;

						gsap.fromTo(
							char,
							{ y: yValue, },
							{
								y: 0,
								opacity: 1,
								duration: 0.4,
								ease: "ease1",
								delay: i * 0.05
							}
						);
					});
				});
			});
		}
		


		if($('.wa_subtitle_ani_1').length) {
			var wa_subtitle_ani_1 = $(".wa_subtitle_ani_1");
	
			if(wa_subtitle_ani_1.length == 0) ; gsap.registerPlugin(SplitText); wa_subtitle_ani_1.each(function(index, el) {
			
				el.split = new SplitText(el, { 
					type: "lines,words,chars",
					linesClass: "split-line"
				});
			
				if( $(el).hasClass('wa_subtitle_ani_1') ){
					gsap.set(el.split.chars, {
						opacity: 0,
					});
				}
			
				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 80%",
						end: "top 60%",
						markers: false,
						// scrub: 2,
					},
			
					xPercent: 0,
					yPercent: 0,
					color: "inherit",
					opacity: 1,
					duration: .1,
					stagger: 0.1,
				});
			
			});
		}


		if($('.wa_title_ani_1').length) {
			var wa_title_ani_1 = $(".wa_title_ani_1");
		
			if(wa_title_ani_1.length == 0) ; 
			gsap.registerPlugin(SplitText); 
			wa_title_ani_1.each(function(index, el) {
			
				el.split = new SplitText(el, { 
					type: "lines",
					linesClass: "split-line"
				});
			
				if( $(el).hasClass('wa_title_ani_1') ){
					gsap.set(el.split.lines, {
						color: "var(--cx-clr-pr-1)",
						yPercent: -100,
					});
				}

				// Get optional data-ani-delay attribute from the HTML element
				var aniDelay = $(el).data('ani-delay');
				if(typeof aniDelay === "undefined" || isNaN(parseFloat(aniDelay))) {
					aniDelay = 0;
				} else {
					aniDelay = parseFloat(aniDelay);
				}
			
				el.anim = gsap.to(el.split.lines, {
					scrollTrigger: {
						trigger: el,
						start: "top 86%",
						end: "top 70%",
						markers: false,
					},
					xPercent: 0,
					yPercent: 0,
					color: "inherit",
					opacity: 1,
					duration: .5,
					stagger: 0.1,
					delay: aniDelay
				});
			
			});
		}
	}	


	// hero-2-slider
	if ($('.cx_h2_slider').length) {

		const cx_h2_slider = new Swiper('.cx_h2_slider', {
			loop: true,
			speed: 500,
			slidesPerView: "auto",
			spaceBetween: 24,
			// autoplay: { delay: 4000 },


			pagination: {
				el: ".cx_h2_slider_pagination",
				clickable: true,
			},
		});
	
	}
/* 
	after-preloader-end
*/
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



// image-animation-1
document.querySelectorAll(".vy-cover-trigger").forEach(trigger => {

	const vyct = gsap.timeline({
	  scrollTrigger: {
		trigger: trigger, 
		start: "top 85%", 
		toggleActions: "play none none reverse", 
		markers: false 
	  }
	});
  
	vyct.to(trigger.querySelectorAll(".vy-cover-slice"), 1, { 
	  height: 0, 
	  ease: "power4.InOut",
	  stagger: { amount: 0.33 } 
	}, 'start')
	
	.from(trigger.querySelector(".vy-cover-slice-img"), 1.2, { 
	  scale: 1.3, 
	  ease: "power4.InOut"
	}, 'start');

});

// features-1-svg 
if ($(".cx-about-1-features-bg-shape").length) {

	const svg = document.querySelector(".cx-about-1-features-bg-shape");
	const path = svg.querySelector(".svg-line");

	const pathLength = path.getTotalLength();

	gsap.set(path, {
		strokeDasharray: pathLength,
		strokeDashoffset: -pathLength, // reverse direction
	});

	gsap.to(path, {
		strokeDashoffset: 0,
		duration: 3,
		ease: "power2.out",
		scrollTrigger: {
			trigger: svg,
			start: "top 70%",
			// scrub: 1,
			markers: false,
		},
	});

}




// services-1-slider
if ($('.cx_services_1_slider').length) {

	const cx_services_1_slider = new Swiper('.cx_services_1_slider', {
		loop: true,
		speed: 500,
		slidesPerView: "auto",
		spaceBetween: 24,
		autoplay: { delay: 4000 },

	});
  
}


/* 
	testimonial-1-animation
*/
if (window.matchMedia("(min-width: 1200px)").matches) {


	var portfolio1title = gsap.timeline({
		scrollTrigger: {
			trigger: ".cx-testimonial-1-grid",
			start: "top 40%",
			end: "bottom bottom",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	portfolio1title.from(".as_t1_item1", {
		yPercent: 60,
	});
	portfolio1title.from(".as_t1_item2", {
		yPercent: 60,
	},"<");	
	portfolio1title.from(".as_t1_item3", {
		yPercent: -130,
	},"<");
	portfolio1title.from(".as_t1_item4", {
		xPercent: -100,
	},"<");
	
  
	
	
}




})(jQuery);