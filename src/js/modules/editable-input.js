export default class EditableInput {
	constructor(editable) {
		if (editable instanceof Element) {
			this.container = editable;
		} else if (typeof editable === "string") {			
			const foundElement = document.querySelector(editable);
			if (foundElement) {
				this.container = foundElement;
			} else {
				throw new Error(`Элемент по селектору "${editable}" не найден`);
			}
		} else {
			throw new Error("Передан некорректный аргумент. Ожидается DOM-элемент или селектор.");
		}

		this.input = this.container.querySelector(".editable-input");
		this.plusButton = this.container.querySelector('.editable-button[data-id="add-value"]');
		this.editButton = this.container.querySelector('.editable-button[data-id="edit-value"]');
		this.eyeButton = this.container.querySelector('.editable-button[data-id="password-value"]');
		this.clearButton = this.container.querySelector('.editable-button[data-id="clear-value"]');

		if (!this.container || !this.input) return;

		// Обработчики для кнопок
		this.plusButton && this.setPlus(this.plusButton);
		this.plusButton && this.plusButton.addEventListener("click", () => this.handlePlusMinus());

		if (this.editButton) {
			this.editButton.addEventListener("click", () => this.toggleEdit());
		}
		if (this.eyeButton) {
			this.eyeButton.addEventListener("click", () => this.togglePassword());
		}
		if (this.clearButton) {
			this.clearButton.addEventListener("click", () => this.clearInput());
		}
		// Обработка изменения инпута
		this.plusButton && this.input.addEventListener("input", () => this.updatePlusMinusButton());

		// Обработка клика вне контейнера
		this.plusButton && document.addEventListener("click", (e) => {
			if (!this.container.contains(e.target)) {
				this.setPlus(this.plusButton);
				this.input.disabled = true;
			}
		});
	}

	toggleEdit() {
		if (this.input.disabled) {
			this.input.disabled = false;
			this.input.focus();
		} else {
			this.input.disabled = true;
		}
	}

	togglePassword() {
		if (this.input.type === "password") {
			this.input.type = "text";
		} else {
			this.input.type = "password";
		}
	}

	clearInput() {
		this.input.value = "";
		this.plusButton && this.updatePlusMinusButton();
	}

	handlePlusMinus() {
		const currentState = this.plusButton.getAttribute("data-state");
		if (currentState == "plus") {
			this.input.disabled = false;
			this.input.focus();
		} else if (currentState == "minus") {
			this.clearInput();
		}

		console.log(currentState);
	}

	updatePlusMinusButton() {
		const value = this.input.value.trim();
		if (value !== "") {
			this.setMinus(this.plusButton);
		} else {
			this.setPlus(this.plusButton);
		}
	}
	setPlus(button) {
		button.setAttribute("data-state", "plus");
		button.innerHTML = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 9.5H13.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M9 14V5" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
	}

	setMinus(button) {
		button.setAttribute("data-state", "minus");
		button.innerHTML = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 9.5H13.5" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
	}
}
