import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();

/*--------------------------------------------------------------------------------------------------------------
LIKES LISTENER 
----------------------------------------------------------------------------------------------------------------*/
import "./mini/likes-listener.js";
/* ------------------------------------------------------------------------------------------------------------------------------
TRANSFER ELEMENTS
--------------------------------------------------------------------------------------------------------------------------------*/
import "./sections/transfer-elements.js";
/* ------------------------------------------------------------------------------------------------------------------------------
KEEN ADVANTAGE SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
import "./sections/advantage-slider.js";
/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER POPULAR PRODUCTS SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
import "./sections/popular-products-slider.js";
/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER MARKETING SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
import "./sections/marketing-slider.js";
/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER COMPANYS SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
import "./sections/companys-slider.js";
/* ------------------------------------------------------------------------------------------------------------------------------
CHOICES SEARCH FILTER
--------------------------------------------------------------------------------------------------------------------------------*/
import "./mini/choices-add.js";
/* ------------------------------------------------------------------------------------------------------------------------------
SWIPER PORODUCT GALLERY THUMBNAILS
--------------------------------------------------------------------------------------------------------------------------------*/
import "./sections/product-thumbnails-slider.js";
/*--------------------------------------------------------------------------------------------------------------
DATA-CATEGORIES LISTENER
----------------------------------------------------------------------------------------------------------------*/
// [data-catId] - catID обязательный префикс(скрипт на нём завязан)
import CatsMenu from "./modules/cats-menu-prod";

const categoriesOverlayMenu = document.querySelector(".exp-catalog");

categoriesOverlayMenu &&
	new CatsMenu({
		parent: ".exp-catalog",
		openBtn: "#catalog-btn",
		catButton: "data-catIDoverlay",
		catBlock: "data-blockIDoverlay",
		backButton: "data-subcatback='overlay'",
		closeButton: "data-catsclose='overlay'",
		openSubListButton: "data-subcatslist='overlay'",
	});

/* ------------------------------------------------------------------------------------------------------------------------------
Main top padding listener
--------------------------------------------------------------------------------------------------------------------------------*/
// const header = document.querySelector(".header");

// window.onresize = updateMainTop.bind(null, header);
// window.onchange = updateMainTop.bind(null, header);
// window.onload = updateMainTop.bind(null, header);

// function updateMainTop(header) {
// 	if (header) {
// 		const headerTopHeight = header.querySelector(".header__top").scrollHeight;
// 		const headerMiddleHeight = header.querySelector(".header__medium").scrollHeight;
// 		const main = document.querySelector(".main");
// 		if (main) {
// 			main.style.paddingTop = headerTopHeight + headerMiddleHeight - 1 + "px";
// 		}
// 	}
// }

/* --------------------------------------------------------------------------------------------------------------------------
FANCYBOX
-----------------------------------------------------------------------------------------------------------------------------*/
Fancybox.bind("[data-fancybox]", {
	Carousel: {
		transition: "slide",
	},
	Images: {
		zoom: false,
	},
	showClass: "f-fadeIn",
});

/* --------------------------------------------------------------------------------------------------------------------------
PRODUCCT GALLERY PARALAX
-----------------------------------------------------------------------------------------------------------------------------*/
import "./modules/product-gallery-parallax.js";

/* --------------------------------------------------------------------------------------------------------------------------
STAR RATING
-----------------------------------------------------------------------------------------------------------------------------*/
import StarRating from "./modules/rating-stars.js";

document.addEventListener("DOMContentLoaded", () => {
	const expirienceRating = document.querySelector(".expirience-form__rating");
	expirienceRating &&
		new StarRating({
			container: ".expirience-form__rating",
			hiddenInput: "#expirience-rating",
		});
});

/* -------------------------------------------------------------------------------------------------------------------------------------------------
Auto scale 
-----------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
	function scalePage() {
		const windowWidth = window.innerWidth;
		const wrapper = document.querySelector(".wrapper");
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		if (windowWidth >= 1200) {
			const pageWidth = wrapper.offsetWidth;
			const minWidth = 1200;
			const maxWidth = 6400;

			const constrainedWidth = Math.max(minWidth, Math.min(windowWidth, maxWidth));

			let sum = constrainedWidth - scrollbarWidth;
			let scaleRatio = sum / pageWidth;
			// Пересчитываем масштаб с учетом ограничений

			wrapper.style.transformOrigin = "top left";
			wrapper.style.transform = "scale(" + scaleRatio + ")";
			wrapper.style.overflowX = "hidden";
			document.body.style.maxBlockSize = 100 / scaleRatio + "%";
			
		} else if (windowWidth < 1200) {
			wrapper.style.removeProperty("transform-origin");
			wrapper.style.removeProperty("transform-scale");
			wrapper.style.removeProperty("overflow-x");
			document.body.style.removeProperty("max-block-size");
		}
	}

	// Вызов при загрузке и при изменении размера окна
	window.onload = scalePage();
	window.onresize = scalePage;
	window.onchange = scalePage;
});
