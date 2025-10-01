/* ------------------------------------------------------------------------------------------------------------------------------
Account company photo slider
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const photosliderSwiper = document.querySelector("#account-photoslider-swiper");

	if (photosliderSwiper) {
		const swiper = new Swiper(photosliderSwiper, {
			slidesPerView: 5,
			spaceBetween: 13, //
			
			navigation: {
				nextEl: ".photoslider__navigation-wrap .arrow.arrow--right",
				prevEl: ".photoslider__navigation-wrap .arrow.arrow--left",
			},

			breakpoints: {
				0: {
					slidesPerView: 3,
					spaceBetween: 5, 
				},
				576: {
					slidesPerView: 3,
					spaceBetween: 5, 
				},
				1200: {
					slidesPerView: 5,
					spaceBetween: 13, //
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
			const nextEl = document.querySelector(".photoslider__navigation-wrap .arrow.arrow--right");
			const prevEl = document.querySelector(".photoslider__navigation-wrap .arrow.arrow--left");

			swiper.isEnd ? nextEl.classList.add("arrow--disabled") : nextEl.classList.remove("arrow--disabled");
			swiper.isBeginning ? prevEl.classList.add("arrow--disabled") : prevEl.classList.remove("arrow--disabled");
		}
	}
});
