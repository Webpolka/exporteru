import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();

/* ------------------------------------------------------------------------------------------------------------------------------
TRANSFER ELEMENTS
--------------------------------------------------------------------------------------------------------------------------------*/
import TransferElements from "./modules/transfer";

const popularTransfering = document.getElementById("popular-transfering");
const popularForTransfered = document.getElementById("popular-for-transfered");

if (popularTransfering && popularForTransfered) {
	new TransferElements({
		sourceElement: popularTransfering,
		breakpoints: {
			576: {
				targetElement: popularForTransfered,
			},
		},
	});
}

/* ------------------------------------------------------------------------------------------------------------------------------
KEEN SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
import navigation from "./modules/keen-navigation";

var slider = new KeenSlider(
	"#advantages-slider",
	{
		slides: {
			perView: 3.2,
			spacing: 20,
		},
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

		created: () => {
			console.log("created");
		},
	},
	[navigation]
);
