/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER MARKETING SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const marketingNav = document.getElementById("marketing-swiper-group");

	const marketingSwiper = document.querySelector("#marketing-swiper");

	if (marketingSwiper) {
		const swiper = new Swiper(marketingSwiper, {
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
				nextEl: "#marketing-swiper-group .arrow.arrow--right",
				prevEl: "#marketing-swiper-group .arrow.arrow--left",
			},

			pagination: {
				el: "#marketing-swiper-group .navigation-group__pagination", // внешний элемент
				clickable: true, // чтобы можно было кликать
				bulletClass: "custom-pagination-bullet", // класс для точек
				bulletActiveClass: "custom-pagination-bullet--active", // активные точки
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
			const nextEl = document.querySelector("#marketing-swiper-group .arrow.arrow--right");
			const prevEl = document.querySelector("#marketing-swiper-group .arrow.arrow--left");

			swiper.isEnd ? nextEl.classList.add("arrow--disabled") : nextEl.classList.remove("arrow--disabled");
			swiper.isBeginning ? prevEl.classList.add("arrow--disabled") : prevEl.classList.remove("arrow--disabled");

			// counter
			const currentSlide = swiper.realIndex + 1; // realIndex — нумерация с 0
			const totalSlides = swiper.slides.length;

			document.querySelector("#marketing-swiper-group .current").textContent = currentSlide;
			document.querySelector("#marketing-swiper-group .total").textContent = totalSlides;
		}

		function uppdateTopPosition(swiper) {
			if (window.innerWidth <= 576) {
				const activeIndex = swiper.activeIndex;
				const activeSlide = swiper.slides[activeIndex];
				const targetContainer = activeSlide.querySelector(".marketing-card__content");
				const targetContainerHeight = targetContainer.clientHeight;
				marketingNav.style.top = targetContainerHeight + 70 + "px";
				if (swiper.params.effect !== "fade") {
					marketingNav.style.opacity = 0;
					setTimeout(() => {
						marketingNav.style.opacity = 1;
					}, swiper.params.speed);
				}
			} else if (window.innerWidth > 576) {
				marketingNav.style.removeProperty("top");
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