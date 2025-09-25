
/* --------------------------------------------------------------------------------------------------------------------------
FILTER PAGE BUTTONS SlIDER
-----------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const scrollContainer = document.querySelector("#filter-buttons-slider"); // замени на свой селектор

	if (scrollContainer) {
		let isDown = false;
		let startX;
		let scrollLeft;
		let isDragging = false; // для определения, было ли движение
		let wasDragged = false; // чтобы запомнить, что было перетаскивание
		let velocity = 0; // скорость для инерции
		let animationFrameId = null;

		// Обработчик начала перетаскивания
		scrollContainer.addEventListener("mousedown", (e) => {
			isDown = true;
			isDragging = false;
			wasDragged = false;
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
			}
			startX = e.pageX - scrollContainer.offsetLeft;
			scrollLeft = scrollContainer.scrollLeft;
			e.preventDefault();
		});

		// Обработчик движения
		scrollContainer.addEventListener("mousemove", (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - scrollContainer.offsetLeft;
			const walk = (x - startX) * 1; // можно регулировать
			if (Math.abs(walk) > 5) {
				isDragging = true;
				wasDragged = true;
			}
			scrollContainer.scrollLeft = scrollLeft - walk;

			// считаем скорость
			const now = performance.now();
			const deltaTime = now - (scrollContainer._lastTime || now);
			if (deltaTime > 0) {
				velocity = ((scrollContainer.scrollLeft - (scrollContainer._lastScrollLeft || 0)) / deltaTime) * 2; // px/frame
			}
			scrollContainer._lastTime = now;
			scrollContainer._lastScrollLeft = scrollContainer.scrollLeft;
		});

		// Обработчик окончания перетаскивания
		document.addEventListener("mouseup", () => {
			if (isDown) {
				isDown = false;
				startInertia();
			}
		});

		// Функция для инерционного затухания
		function startInertia() {
			const decay = 0.95; // коэффициент затухания
			const minVelocity = 0.1; // минимальная скорость для остановки

			function animate() {
				velocity *= decay;
				if (Math.abs(velocity) < minVelocity) {
					return; // останавливаем анимацию
				}
				scrollContainer.scrollLeft += velocity;
				animationFrameId = requestAnimationFrame(animate);
			}
			animationFrameId = requestAnimationFrame(animate);
		}

		// Универсальный обработчик клика внутри контейнера
		const list = document.getElementById("filter-buttons-slider");
		scrollContainer.addEventListener("click", (e) => {
			if (wasDragged) {
				// Если было перетаскивание, отменяем дефолтное поведение элемента
				if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
					e.preventDefault();
				}
			} else {
				Array.from(list.querySelectorAll("button")).forEach((btn) => btn.classList.remove("btn-gray--active"));				
				e.target.classList.add("btn-gray--active");
			}
		});
	}
});
