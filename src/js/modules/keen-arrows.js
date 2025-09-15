export default function arrowsInit(slider, arrowLeft, arrowRight) {
	arrowLeft.addEventListener("click", () => slider.prev());
	arrowRight.addEventListener("click", () => slider.next());

	slider.on("created", () => {
		updateClasses();
	});
	slider.on("optionsChanged", () => {
		updateClasses();
	});
	slider.on("slideChanged", () => {
		updateClasses();
	});

	function updateClasses() {
		const details = slider.track.details;
		const totalSlides = details.slides.length;
		const currentSlideIndex = details.rel; // индекс текущего "ближайшего" слайда

		const maxIndex = totalSlides; // примерная граница
		const oneIndex = maxIndex * slider.options.slides.perView;

		const boundRight = (currentSlideIndex / maxIndex) * oneIndex;

		currentSlideIndex === 0 ? arrowLeft.classList.add("arrow--disabled") : arrowLeft.classList.remove("arrow--disabled");
		boundRight >= maxIndex ? arrowRight.classList.add("arrow--disabled") : arrowRight.classList.remove("arrow--disabled");
	}
}
