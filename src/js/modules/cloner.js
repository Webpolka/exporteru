export default class Cloner {
	constructor(options = {}) {
		this.buttonSelector = options.buttonSelector || ".repeater-clone-btn"; // селектор кнопки
		this.targetAttribute = options.targetAttribute || "data-clone-target"; // дата-атрибут для указания блока
		this.maxClones = options.maxClones || 10; // максимум клонирований
		this.init();
	}

	init() {
		document.querySelectorAll(this.buttonSelector).forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const targetSelector = btn.getAttribute(this.targetAttribute);
				if (!targetSelector) return;

				const targetBlock = document.querySelector(targetSelector);
				if (!targetBlock) return;

				// Проверяем сколько уже клонировано
				const clonesCount = this.countClones(targetBlock);
				if (clonesCount >= this.maxClones) {
					alert(`Достигнуто ограничение в ${this.maxClones} копий.`);
					return;
				}

				this.cloneBlock(targetBlock);
			});
		});
	}

	countClones(originalBlock) {
		// считаем все блоки, являющиеся клонами (можно по классу или по какому-то признаку)
		// Предположим, что клонированные элементы имеют определенный класс, например 'cloned'
		const parent = originalBlock.parentNode;
		return parent.querySelectorAll(".cloned").length;
	}

	cloneBlock(block) {
		const clone = block.cloneNode(true); // глубокое клонирование
		clone.classList.add("cloned"); // добавляем класс, чтобы отличать клонированные

		// сбрасываем формы внутри клона
		this.resetFormElements(clone);

		// вставляем под оригинал
		block.parentNode.insertBefore(clone, block.nextSibling);
	}

	resetFormElements(element) {
		const forms = element.querySelectorAll("input, textarea, select");
		forms.forEach((form) => {
			if (form.type === "checkbox" || form.type === "radio") {
				form.checked = false;
			} else {
				form.value = "";
			}
		});
	}
}