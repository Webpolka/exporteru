/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER COMPANYS SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const companysSwiper = document.querySelector("#companys-swiper");

	if (companysSwiper) {
		const swiper = new Swiper(companysSwiper, {
			// effect: "fade", // включаем эффект fade
			// fadeEffect: {
			// 	crossFade: true, // плавное перекрытие между слайдами
			// },
			// дополнительные параметры
			slidesPerView: 3, // показывать 4 слайда одновременно
			spaceBetween: 10, //

			speed: 600,
			autoplay: {
				delay: 7000,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 20,
				},

				1300: {
					slidesPerView: 3,
					spaceBetween: 30,
				},				
			},
			navigation: {
				nextEl: "#companys-swiper-arrows .arrow.arrow--right",
				prevEl: "#companys-swiper-arrows .arrow.arrow--left",
			},

			on: {
				init: updateAll.bind(this),
				slideChange: updateAll.bind(this),
				reachEnd: updateAll.bind(this),
				reachBeginning: updateAll.bind(this),
			},
		});

		function updateAll(swiper) {
			updateNavigationGroup(swiper);
		}

		// Функция для обновления классов стрелок
		function updateNavigationGroup(swiper) {
			// arrows
			const nextEl = document.querySelector("#companys-swiper-arrows .arrow.arrow--right");
			const prevEl = document.querySelector("#companys-swiper-arrows .arrow.arrow--left");

			swiper.isEnd ? nextEl.classList.add("arrow--disabled") : nextEl.classList.remove("arrow--disabled");
			swiper.isBeginning ? prevEl.classList.add("arrow--disabled") : prevEl.classList.remove("arrow--disabled");
		}
	}
});
