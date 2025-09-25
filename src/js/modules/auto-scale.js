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
			document.body.style.maxBlockSize =  100 / scaleRatio + "%";
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
