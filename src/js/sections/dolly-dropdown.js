export default class DollyDropDown {
	constructor() {
		// Находим все элементы с классом dolly-dropdown
		this.dropdowns = document.querySelectorAll(".dolly-dropdown");

		this.dropdowns.forEach((dropdown) => {
			this.initDropdown(dropdown);
		});

		// Обработчик клика вне дропдауна
		document.addEventListener("click", (event) => {
			this.handleDocumentClick(event);
		});
	}

	initDropdown(dropdown) {
		const toggleBtn = dropdown.querySelector(".dolly-dropdown__toggle");
		const arrow = dropdown.querySelector(".down-arrow");
		const content = dropdown.querySelector(".dolly-dropdown__list");
		const selectedSpan = dropdown.querySelector(".list-item--selected");
		const options = dropdown.querySelectorAll(".list-item");		

		// Обработчик открытия/закрытия
		toggleBtn.addEventListener("click", (e) => {
			e.stopPropagation(); // чтобы клик не ушёл на документ
			if (content.style.display === "none" || content.style.display === "") {
				this.closeAllDropdowns(); // закрываем все остальные
				content.style.display = "block";
				arrow.style.transform = "translateY(-50%) rotate(180deg) ";
				dropdown.style.border = "1px solid rgb(0, 0, 0, 0.1)";
			} else {
				content.style.display = "none";
				arrow.style.transform = " translateY(-50%) rotate(0deg)";
				dropdown.style.border = "1px solid transparent";
			}
		});

		// Обработка выбора
		options.forEach((option) => {
			option.addEventListener("click", (e) => {
				e.stopPropagation(); // чтобы клик не ушёл на документ
				// Тут можно обновить выбранный элемент, если нужно
				// if (selectedSpan) {
				// 	selectedSpan.textContent = option.textContent;
				// }
				content.style.display = "none";
				arrow.style.transform = " translateY(-50%) rotate(0deg)";
			});
		});
	}

	handleDocumentClick(event) {
		// Проверяем, что клик вне любого из дропдаунов
		this.dropdowns.forEach((dropdown) => {
			if (!dropdown.contains(event.target)) {
				// Если клик вне, закрываем
				const content = dropdown.querySelector(".dolly-dropdown__list");
				const arrow = dropdown.querySelector(".down-arrow");
				if (content.style.display === "block") {
					content.style.display = "none";
					arrow.style.transform = " translateY(-50%) rotate(0deg)";
				}
			}
		});
	}

	closeAllDropdowns() {
		this.dropdowns.forEach((dropdown) => {
			const content = dropdown.querySelector(".dolly-dropdown__list");
			const arrow = dropdown.querySelector(".down-arrow");
			if (content.style.display === "block") {
				content.style.display = "none";
				arrow.style.transform = " translateY(-50%) rotate(0deg)";
			}
		});
	}
}
