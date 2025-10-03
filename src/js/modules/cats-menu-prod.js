export default class CatsMenu {
	constructor(options = {}) {
		const defaultConfig = {
			parent: ".exp-catalog",
			openBtn: false,
			catButton: "data-catIDoverlay",
			catBlock: "data-blockIDoverlay",
			backButton: 'data-id="subcat-back"',			
		};

		this.options = Object.assign(defaultConfig, options);
		this.parent = document.querySelector(this.options.parent);
		this.openBtn = document.querySelector(this.options.openBtn);
		this.back = this.options.backButton;

		this.allCatButtons = this.parent.querySelectorAll(`[${this.options.catButton}]`);
		this.allCatBlocks = this.parent.querySelectorAll(`[${this.options.catBlock}]`);

		this.header = document.querySelector(".header");
		this.init();
	}

	closeAnotherLists(currentList, button) {
		this.parent.querySelectorAll(`[${this.options.openSubListButton}]`).forEach((btn) => {
			const parent = btn.closest(`${this.options.parent}__subcats-list`);
			const targetList = parent.querySelector("ul");
			if (currentList !== targetList) {
				targetList.classList.remove("active");
				targetList.style.maxHeight = "";
			}
			if (button !== btn) {
				btn.classList.remove("active");
			}
		});
	}

	removeAnotherBlocks(targetBlock, button) {
		this.allCatBlocks.forEach((block) => {
			if (targetBlock !== block) {
				block.classList.remove("active");
			}
		});
		this.allCatButtons.forEach((btn) => {
			if (button !== btn) {
				btn.classList.remove("active");
			}
		});
	}

	getValueAfterPrefix(str, prefix) {
		const startIndex = str.indexOf(prefix);
		if (startIndex === -1) {
			// Префикс не найден
			return null;
		}
		const valueStart = startIndex + prefix.length;
		// Можно взять остаток строки после префикса
		return str.substring(valueStart).trim();
	}

	getDataAttributeCatID(targetElement, targetAttribute) {
		const dataAttributes = [];
		let result;

		for (let attr of targetElement.attributes) {
			if (attr.name.startsWith("data-catid")) {
				dataAttributes.push(attr.name);
			}
		}

		dataAttributes.forEach((d) => {
			if (d === targetAttribute.toLowerCase()) {
				result = d;
			}
		});
		return result;
	}

	closeAllSublists() {
		const allSublists = this.parent.querySelectorAll(".exp-catalog__subcats");
		allSublists.forEach((l) => {
			l.classList.remove("active-lg");
		});
	}

	addNoScroll() {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.querySelector(".wrapper").style.paddingRight = scrollbarWidth + "px";
		document.documentElement.classList.add("no-scroll");
		const overlay = document.querySelector("#site-overlay");
		overlay && overlay.classList.add("active");

		// const header = document.querySelector(".header");
		// if (header) {
		// 	header.style.marginRight = scrollbarWidth + "px";
		// }
	}
	removeNoScroll() {
		document.documentElement.classList.remove("no-scroll");
		document.querySelector(".wrapper").style.removeProperty("padding-right");
		const overlay = document.querySelector("#site-overlay");
		overlay && overlay.classList.remove("active");

		// const header = document.querySelector(".header");
		// header && header.style.removeProperty("margin-right");
	}

	init() {
		this.allCatButtons[0].classList.add("active");
		this.allCatBlocks[0].classList.add("active");
		let timer;
		// Предположим, что все ваши кнопки находятся внутри this.parent
		this.parent.addEventListener("mouseover", (e) => {
			if (window.innerWidth <= 992) return; // Не выполнять, если ширина ≤ 992px

			const target = e.target.closest(`[${this.options.catButton}]`);

			// Проверяем, что событие произошло именно на кнопке
			if (target && this.parent.contains(target)) {
				const dataAttrName = this.getDataAttributeCatID(target, this.options.catButton);
				const dataAfterPrefix = this.getValueAfterPrefix(dataAttrName, "catid");

				const catid = target.getAttribute(`data-catid${dataAfterPrefix}`);
				const targetBlock = this.parent.querySelector(`[${this.options.catBlock}='${catid}']`);

				if (targetBlock) {
					target.classList.add("active");
					this.removeAnotherBlocks(targetBlock, target);
					clearTimeout(timer);
					timer = setTimeout(() => {
						targetBlock.classList.add("active");
					}, 50);
				}
			}
		});		

		// Отслеживаем нажатие на бургер
		this.openBtn &&
			this.openBtn.addEventListener("click", () => {
				this.closeAllSublists();
				this.parent.classList.toggle("active");
				this.openBtn.querySelector(".btn-catalog__burger").classList.toggle("active");
				if (this.openBtn.querySelector(".btn-catalog__burger").classList.contains("active")) {
					this.addNoScroll();
				} else {
					this.removeNoScroll();
				}
			});

		// Общее событие для всей области parent
		this.parent.addEventListener("click", (e) => {
			const target = e.target;

			// Обработка кликов внутри меню
			// Кнопки категорий
			if (target && target.closest(`[${this.options.catButton}]`)) {
				const btn = target.closest(`[${this.options.catButton}]`);

				const dataAttrName = this.getDataAttributeCatID(btn, this.options.catButton);
				const dataAfterPrefix = this.getValueAfterPrefix(dataAttrName, "catid");

				const catid = btn.getAttribute(`data-catid${dataAfterPrefix}`);

				const targetBlock = this.parent.querySelector(`[${this.options.catBlock}='${catid}']`);
				if (targetBlock) {
					targetBlock.classList.add("active-lg");

					this.parent.querySelector(`${this.options.parent}-zindex`) &&
						this.parent.querySelector(`${this.options.parent}-zindex`).classList.add("over");
				}
				return;
			}
	

			// Кнопки "вернуться"
			if (target.closest(`[${this.options.backButton}]`)) {				
				this.closeAllSublists();
			}	
			
		});
	}
}
