import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();

/*--------------------------------------------------------------------------------------------------------------
LIKES LISTENER 
----------------------------------------------------------------------------------------------------------------*/
const allFavoursLiked = document.querySelectorAll("[data-likeID]");
allFavoursLiked.forEach((like) => {
	like.addEventListener("click", function (e) {
		e.preventDefault();
		e.stopPropagation();
		this.classList.toggle("active");
	});
});

/* ------------------------------------------------------------------------------------------------------------------------------
TRANSFER ELEMENTS
--------------------------------------------------------------------------------------------------------------------------------*/
import TransferElements from "./modules/transfer";

const popularCatsButton = document.getElementById("popularcats-button");
const popularCatsPlace = document.getElementById("popularcats-place");

if (popularCatsButton && popularCatsPlace) {
	new TransferElements({
		sourceElement: popularCatsButton,
		breakpoints: {
			576: {
				targetElement: popularCatsPlace,
			},
		},
	});
}

const advantageArrows = document.getElementById("advantages-arrows");
const advantageArrowsPlace = document.getElementById("advantages-arrows-place");

if (advantageArrows && advantageArrowsPlace) {
	new TransferElements({
		sourceElement: advantageArrows,
		breakpoints: {
			768: {
				targetElement: advantageArrowsPlace,
				targetPosition: 1,
			},
		},
	});
}

const popularProdGroup = document.getElementById("popularprod-navig-group");
const popularProdGroupPlace = document.getElementById("popularprod-sm-place");

if (popularProdGroup && popularProdGroupPlace) {
	new TransferElements({
		sourceElement: popularProdGroup,
		breakpoints: {
			768: {
				targetElement: popularProdGroupPlace,
			},
		},
	});
}

/* ------------------------------------------------------------------------------------------------------------------------------
KEEN ADVANTAGE SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
import arrowsInit from "./modules/keen-arrows";

document.addEventListener("DOMContentLoaded", () => {
	var advantageSlider = new KeenSlider("#advantages-slider", {
		slides: {
			perView: 3.2,
			spacing: 20,
		},
		controls: false,
		breakpoints: {
			"(max-width: 575px)": {
				slides: { perView: 1.47, spacing: 15 },
			},
			"(min-width: 576px)": {
				slides: { perView: 2.2, spacing: 15 },
			},
			"(min-width: 768px)": {
				slides: { perView: 3.31, spacing: 20 },
			},
		},

		created: () => {},
	});

	// init arrows
	const advantageLeft = document.querySelector("#advantages-arrow-prev");
	const advantageRight = document.querySelector("#advantages-arrow-next");
	arrowsInit(advantageSlider, advantageLeft, advantageRight);
});

/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER POPULAR PRODUCTS SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const popularProdSwiper = document.querySelector("#popularprod-swiper");

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
				nextEl: ".popularprod__navigation-wrap .arrow.arrow--right",
				prevEl: ".popularprod__navigation-wrap .arrow.arrow--left",
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
			const nextEl = document.querySelector(".popularprod__navigation-wrap .arrow.arrow--right");
			const prevEl = document.querySelector(".popularprod__navigation-wrap .arrow.arrow--left");

			swiper.isEnd ? nextEl.classList.add("arrow--disabled") : nextEl.classList.remove("arrow--disabled");
			swiper.isBeginning ? prevEl.classList.add("arrow--disabled") : prevEl.classList.remove("arrow--disabled");
		}
	}
});

/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER MARKETING SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const marketingSwiper = document.querySelector("#marketing-swiper");

	if (marketingSwiper) {
		const swiper = new Swiper(marketingSwiper, {
			effect: "fade", // включаем эффект fade
			fadeEffect: {
				crossFade: true, // плавное перекрытие между слайдами
			},
			// дополнительные параметры
			slidesPerView: 1,
			speed: 1500,	
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
				init: updateNavigationGroup.bind(this),
				slideChange: updateNavigationGroup.bind(this),
				reachEnd: updateNavigationGroup.bind(this),
				reachBeginning: updateNavigationGroup.bind(this),
			},
		});

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
	}
});
