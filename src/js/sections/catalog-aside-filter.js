/* -------------------------------------------------------------------------------------------------------------------------------------------------
UISLIDER filter range  slider
-----------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
	var slider = document.getElementById("filter-range-slider");

	if (slider) {
		noUiSlider.create(slider, {
			start: [100, 1000000],
			connect: true,
			range: {
				min: 0,
				max: 1000000,
			},
			step: 50,
			tooltips: false,
		});

		// Получаем поля
		var inputMin = document.getElementById("filter-range-min");
		var inputMax = document.getElementById("filter-range-max");

		// Обновляем поля при перемещении слайдера
		slider.noUiSlider.on("update", function (values) {
			inputMax ? (inputMin.value = Math.round(values[0])) : "";
			inputMax ? (inputMax.value = Math.round(values[1])) : "";
		});

		// Обновляем слайдер при вводе в поля
		inputMin &&
			inputMin.addEventListener("change", function () {
				slider.noUiSlider.set([this.value, null]);
			});
		inputMax &&
			inputMax.addEventListener("change", function () {
				slider.noUiSlider.set([null, this.value]);
			});

		// сборка и отправка данных через fetch если будет нужно
		const form = document.getElementById("filter-widget-form");
		form &&
			form.addEventListener("submit", function (e) {
				e.preventDefault();
				const formData = new FormData(this);

				// fetch("/api/filter", {
				// 	method: "POST",
				// 	body: formData,
				// }).then(/*...*/);
			});
	}

	// Кнопка сбросит все
	const resetBtn = document.querySelector('[data-id="filter-reset"]');

	resetBtn &&
		resetBtn.addEventListener("click", () => {
			document.querySelectorAll(".filter-form input").forEach((i) => {
				i.checked = false;
				i.value = "";
			});
			if (slider && slider.noUiSlider) {
				slider.noUiSlider.set([0, 1000000]);
			}
		});
});
