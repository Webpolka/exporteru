/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER AUTHORIZE SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const authorizeSwiper = document.getElementById("authorize-swiper");
	const authorizeNav = document.getElementById('authorize-slider-nav');

	if (authorizeSwiper) {
		const swiper = new Swiper(authorizeSwiper, {
			effect: "fade", // включаем эффект fade
			fadeEffect: {
				crossFade: true, // плавное перекрытие между слайдами
			},
			// дополнительные параметры
			slidesPerView: 1,
			speed: 300,
			autoplay: {
				delay: 7000,
			},
			navigation: {
				nextEl: ".authorize-slider__navigation-wrap .arrow.arrow--right",
				prevEl: ".authorize-slider__navigation-wrap .arrow.arrow--left",
			},

			on: {
				init: updateAll.bind(this),
				slideChange: updateAll.bind(this),
				reachEnd: updateAll.bind(this),
				reachBeginning: updateAll.bind(this),
			},
		});

		function updateAll(swiper) {
			uppdateTopPosition(swiper);
			updateNavigationGroup(swiper);
		}

		// Функция для обновления классов стрелок
		function updateNavigationGroup(swiper) {
			// arrows
			const nextEl = document.querySelector(".authorize-slider__navigation-wrap .arrow.arrow--right");
			const prevEl = document.querySelector(".authorize-slider__navigation-wrap .arrow.arrow--left");

			swiper.isEnd ? nextEl.classList.add("arrow--disabled") : nextEl.classList.remove("arrow--disabled");
			swiper.isBeginning ? prevEl.classList.add("arrow--disabled") : prevEl.classList.remove("arrow--disabled");
		}
		function uppdateTopPosition(swiper) {
			if (window.innerWidth <= 576) {
				const activeIndex = swiper.activeIndex;
				const activeSlide = swiper.slides[activeIndex];
				const targetContainer = activeSlide.querySelector(".authorize-slider__textwrap");
				const targetContainerHeight = targetContainer.clientHeight;
				authorizeNav.style.top = targetContainerHeight - 5 + "px";
				if (swiper.params.effect !== "fade") {
					authorizeNav.style.opacity = 0;
					setTimeout(() => {
						authorizeNav.style.opacity = 1;
					}, swiper.params.speed);
				}
			} else if (window.innerWidth > 576) {
				authorizeNav.style.removeProperty("top");
			}
		}

		let timer;
		window.addEventListener("change", () => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				uppdateTopPosition(swiper);
			}, 100);
		});
		window.addEventListener("resize", () => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				uppdateTopPosition(swiper);
			}, 100);
		});
	}
});
