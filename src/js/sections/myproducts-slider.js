/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER MY PRODUCTS SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const popularProdSwiper = document.querySelector("#myproducts-swiper");

	if (popularProdSwiper) {
		const swiper = new Swiper(popularProdSwiper, {
			effect: "fade", // включаем эффект fade
			fadeEffect: {
				crossFade: true, // плавное перекрытие между слайдами
			},
			// дополнительные параметры
			slidesPerView: 1,

			autoplay: {
				delay: 7000,
			},
			navigation: {
				nextEl: ".myproducts__navigation-wrap .arrow.arrow--right",
				prevEl: ".myproducts__navigation-wrap .arrow.arrow--left",
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
			const nextEl = document.querySelector(".myproducts__navigation-wrap .arrow.arrow--right");
			const prevEl = document.querySelector(".myproducts__navigation-wrap .arrow.arrow--left");

			swiper.isEnd ? nextEl.classList.add("arrow--disabled") : nextEl.classList.remove("arrow--disabled");
			swiper.isBeginning ? prevEl.classList.add("arrow--disabled") : prevEl.classList.remove("arrow--disabled");
		}
	}
});
