/* ------------------------------------------------------------------------------------------------------------------------------
KEEN ADVANTAGE SLIDER
--------------------------------------------------------------------------------------------------------------------------------*/
import arrowsInit from "../modules/keen-arrows";

document.addEventListener("DOMContentLoaded", () => {
	const advSlider = document.querySelector("#advantages-slider");
	if (advSlider) {
		var advantageSlider = new KeenSlider("#advantages-slider", {
			slides: {
				perView: 3.2,
				spacing: 26,
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
					slides: { perView: 3.31, spacing: 26 },
				},
			},

			created: () => {},
		});

		// init arrows
		const advantageLeft = document.querySelector("#advantages-arrow-prev");
		const advantageRight = document.querySelector("#advantages-arrow-next");
		arrowsInit(advantageSlider, advantageLeft, advantageRight);
	}
});
