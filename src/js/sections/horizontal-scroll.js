/* --------------------------------------------------------------------------------------------------------------------------
Обработчик горизонтального скролла для мультиселекта Choices
-----------------------------------------------------------------------------------------------------------------------------*/
export default class HorizontalScroll {
	constructor(container) {
		if (container instanceof Element) {
			this.container = container;
		} else if (typeof container === "string") {
			const foundElement = document.querySelector(container);
			if (foundElement) {
				this.container = foundElement;
			} else {
				console.log(`Элемент по селектору "${container}" не найден`);
				return;
			}
		} else {
			console.log("Передан некорректный аргумент. Ожидается DOM-элемент или селектор.");
			return;
		}

		let isDown = false;
		let startX;
		let scrollLeft;
		let isDragging = false; // для определения, было ли движение
		let wasDragged = false; // чтобы запомнить, что было перетаскивание
		let velocity = 0; // скорость для инерции
		let animationFrameId = null;

		// Обработчик начала перетаскивания
		this.container.addEventListener("mousedown", (e) => {
			isDown = true;
			isDragging = false;
			wasDragged = false;
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
			}
			startX = e.pageX - this.container.offsetLeft;
			scrollLeft = this.container.scrollLeft;
			e.preventDefault();
		});

		// Обработчик движения
		this.container.addEventListener("mousemove", (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - this.container.offsetLeft;
			const walk = (x - startX) * 1; // можно регулировать
			if (Math.abs(walk) > 5) {
				isDragging = true;
				wasDragged = true;
			}
			this.container.scrollLeft = scrollLeft - walk;

			// считаем скорость
			const now = performance.now();
			const deltaTime = now - (this.container._lastTime || now);
			if (deltaTime > 0) {
				velocity = ((this.container.scrollLeft - (this.container._lastScrollLeft || 0)) / deltaTime) * 2; // px/frame
			}
			this.container._lastTime = now;
			this.container._lastScrollLeft = this.container.scrollLeft;
		});

		// Обработчик окончания перетаскивания
		document.addEventListener("mouseup", () => {
			if (isDown) {
				isDown = false;
				startInertia();
			}
		});

		let cont = this.container;
		// Функция для инерционного затухания
		function startInertia() {
			const decay = 0.95; // коэффициент затухания
			const minVelocity = 0.1; // минимальная скорость для остановки
			function animate() {
				velocity *= decay;
				if (Math.abs(velocity) < minVelocity) {
					return; // останавливаем анимацию
				}
				cont.scrollLeft += velocity;
				animationFrameId = requestAnimationFrame(animate);
			}
			animationFrameId = requestAnimationFrame(animate);
		}

		// Универсальный обработчик клика внутри контейнера
		const list = this.container;
		this.container.addEventListener("click", (e) => {
			if (wasDragged) {
				// Если было перетаскивание, отменяем дефолтное поведение элемента
				if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
					e.preventDefault();
				}			
				if (e.target.closest("a")) {
					e.preventDefault(); // отключить переход по ссылке
				}
				if (e.target.closest("button")) {
					e.preventDefault(); // отключить переход по ссылке
				}
			} else {
				if (list.querySelector("button")) {
					Array.from(list.querySelectorAll("button")).forEach((btn) => btn.classList.remove("btn-gray--active"));
					e.target.classList.add("btn-gray--active");
				}
			}
		});
	}
}
