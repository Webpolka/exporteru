/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER SIMILAR PRODUCTS IN ACCOUNT PAGE
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const similarProdSwiper = document.querySelector("#similar-swiper");

	if (similarProdSwiper) {
		const swiper = new Swiper(similarProdSwiper, {
			slidesPerView: 3,
			spaceBetween: 14, //
			
			navigation: {
				nextEl: ".similar-flexheader__navigation-wrap .arrow.arrow--right",
				prevEl: ".similar-flexheader__navigation-wrap .arrow.arrow--left",
			},

			breakpoints: {
				0: {
					slidesPerView: 2,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 14, 
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 14, //
				},
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
			const nextEl = document.querySelector(".similar-flexheader__navigation-wrap .arrow.arrow--right");
			const prevEl = document.querySelector(".similar-flexheader__navigation-wrap .arrow.arrow--left");

			swiper.isEnd ? nextEl.classList.add("arrow--disabled") : nextEl.classList.remove("arrow--disabled");
			swiper.isBeginning ? prevEl.classList.add("arrow--disabled") : prevEl.classList.remove("arrow--disabled");
		}
	}
});
