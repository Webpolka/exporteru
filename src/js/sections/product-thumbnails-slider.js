/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER PRODUCT GALLERY THUMBNAILS
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const prodThumbSlider = document.querySelector("#product-swiper");

	if (prodThumbSlider) {
		const swiper = new Swiper(prodThumbSlider, {
			// дополнительные параметры
			slidesPerView: 4,
			spaceBetween: 10, //
			breakpoints: {
				0: {				
					spaceBetween: 8,
				},
				576: {					
					spaceBetween: 10,
				},
			},

			autoplay: {
				delay: 7000,
			},
			navigation: {
				nextEl: "#product-swiper-nav .arrow.arrow--right",
				prevEl: "#product-swiper-nav .arrow.arrow--left",
			},

			on: {
				init: updateNavigationGroup.bind(this),
				slideChange: updateNavigationGroup.bind(this),
				reachEnd: updateNavigationGroup.bind(this),
				reachBeginning: updateNavigationGroup.bind(this),
			},
		});

		// Функция для обновления классов стрелок
		function updateNavigationGroup(swiper) {
			const nextEl = document.querySelector("#product-swiper-nav .arrow.arrow--right");
			const prevEl = document.querySelector("#product-swiper-nav .arrow.arrow--left");

			swiper.isEnd ? nextEl.classList.add("arrow--disabled") : nextEl.classList.remove("arrow--disabled");
			swiper.isBeginning ? prevEl.classList.add("arrow--disabled") : prevEl.classList.remove("arrow--disabled");
		}
	}
});
