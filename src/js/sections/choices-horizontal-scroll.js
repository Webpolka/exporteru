
/* --------------------------------------------------------------------------------------------------------------------------
Обработчик горизонтального скролла для мультиселекта Choices
-----------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const scrollContainer = document.querySelector(".choices__list--multiple");

	if (!scrollContainer) {
		console.log("Контейнер для скролла не найден");
		return;
	}

	let isDown = false;
	let isDragging = false; // флаг перетаскивания
	let startX;
	let scrollLeft;

	// mousedown внутри контейнера
	scrollContainer.addEventListener("mousedown", (e) => {
		isDown = true;
		isDragging = false; // сброс при начале
		startX = e.pageX - scrollContainer.offsetLeft;
		scrollLeft = scrollContainer.scrollLeft;
		scrollContainer.classList.add("active");
	});

	// Обработчики на документе для отслеживания движения и отпускания
	document.addEventListener("mousemove", (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - scrollContainer.offsetLeft;
		const walk = (x - startX) * 1;
		scrollContainer.scrollLeft = scrollLeft - walk;

		// Если движение больше порога, считаем что это drag
		if (Math.abs(x - startX) > 5) {
			isDragging = true;
		}
	});

	document.addEventListener("mouseup", () => {
		if (isDown) {
			isDown = false;
			scrollContainer.classList.remove("active");
		}
	});

	// Обработка клика внутри контейнера
	scrollContainer.addEventListener("click", (e) => {
		if (isDragging) {
			e.preventDefault();
			e.stopPropagation();
			isDragging = false;
		}
	});
});
