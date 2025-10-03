export default class MediaLoadUploader {
	constructor(el, options = {}) {
		const defaultConfig = {
			maxFileSizeKB: 1000,
			maxImages: 4,
			inputId: false,
			inputName: false,
			containerClass: "mediaload-container",
			columnClass: "mediaload-column",
			imageClass: "mediaload-image",
			messageClass: "mediaload-message",
		};
		this.options = Object.assign(defaultConfig, options);
		this.maxFileSizeKB = this.options.maxFileSizeKB || 500;
		this.max = this.options.maxImages;

		// Получение контейнера
		if (typeof el === "string") {
			this.container = document.querySelector(el);
		} else if (el instanceof HTMLElement) {
			this.container = el;
		} else {
			this.container = null;
		}

		this.medialoadContainer = this.container.querySelector(`.${this.options.containerClass}`);
		this.selectedFiles = [];

		// Создаем элемент для сообщений
		this.messageElem = document.createElement("div");
		this.messageElem.className = this.options.messageClass;
		this.messageElem.style.color = "red"; // или стиль по вашему вкусу
		this.container.appendChild(this.messageElem);

		// Ищем или создаем скрытый input
		this.input = this.container.querySelector('input[type="file"]');
		if (!this.input) {
			this.input = document.createElement("input");
			this.input.type = "file";
			this.input.id = this.options.inputId ? this.options.inputId : "";
			this.input.name = this.options.inputName ? this.options.inputName : "";
			this.input.multiple = true;
			this.input.accept = "image/jpeg, image/png";
			this.input.style.display = "none";
			this.container.appendChild(this.input);
		}

		// Изначально собираем все существующие контейнеры изображений
		this.imageContainers = Array.from(
			this.medialoadContainer.querySelectorAll(`.${this.options.columnClass} .${this.options.imageClass}`)
		);

		// Обработчик для клика
		this.medialoadContainer.addEventListener("click", () => {
			this.clearMessage();
			this.input.click();
		});

		this.input.addEventListener("change", () => {
			this.handleFiles(this.input.files);
		});
	}

	showMessage(msg) {
		this.messageElem.innerText = msg;
	}

	clearMessage() {
		this.messageElem.innerText = "";
	}

	handleFiles(files) {
		this.clearMessage();

		const filesArray = Array.from(files);
		const currentCount = this.selectedFiles.length;
		const remainingSlots = this.max - currentCount;

		if (remainingSlots <= 0) {
			this.showMessage(`Достигнуто максимальное количество изображений (${this.max}).`);
			return;
		}

		const filesToAdd = filesArray.slice(0, remainingSlots); // добавляем только сколько можем

		for (const file of filesToAdd) {
			if (!file.type.startsWith("image/")) continue;

			// Проверка на дублирование
			const isDuplicate = this.selectedFiles.some((f) => f.name === file.name);
			if (isDuplicate) {
				this.showMessage(`Изображение "${file.name}" уже добавлено.`);
				continue;
			}

			// Проверка размера файла
			if (file.size > this.maxFileSizeKB * 1024) {
				this.showMessage(`Изображение "${file.name}" превышает максимальный размер (${this.maxFileSizeKB} KB).`);
				continue;
			}

			this.selectedFiles.push(file);

			const dataTransfer = new DataTransfer();
			this.selectedFiles.forEach((f) => dataTransfer.items.add(f));
			this.input.files = dataTransfer.files;

			const reader = new FileReader();
			reader.onload = (e) => {
				this.insertImage(e.target.result, file);
			};
			reader.readAsDataURL(file);
		}

		if (filesArray.length > remainingSlots) {
			this.showMessage(`Добавлено только ${remainingSlots} изображений из ${filesArray.length} возможных.`);
		}
	}

	// остальные методы без изменений, только добавим вызовы showMessage / clearMessage
	insertImage(imageSrc, file) {
		let emptyContainer = this.imageContainers.find((container) => container.innerHTML.trim() === "");
		if (!emptyContainer) {
			emptyContainer = this.createNewContainer();
			this.imageContainers.push(emptyContainer);
		}
		this.insertImageInContainer(emptyContainer, imageSrc, file);
		this.ensureEmptyContainerExists();
	}

	createNewContainer() {
		const containerDiv = document.createElement("div");
		containerDiv.className = this.options.columnClass;

		const imgDiv = document.createElement("div");
		imgDiv.className = this.options.imageClass;

		containerDiv.appendChild(imgDiv);
		this.medialoadContainer.appendChild(containerDiv);
		return imgDiv;
	}

	insertImageInContainer(container, imageSrc, file) {
		container.innerHTML = "";

		const imgdiv = document.createElement("div");
		imgdiv.className = this.options.imageClass;

		const img = document.createElement("img");
		img.src = imageSrc;

		const deleteBtn = document.createElement("button");
		deleteBtn.innerHTML =
			'<svg width="15" height="15"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0.418415 0.418415C0.976316 -0.139472 1.88083 -0.139472 2.43873 0.418415L10 7.97973L17.5613 0.418415C18.1192 -0.139472 19.0237 -0.139472 19.5816 0.418415C20.1395 0.976316 20.1395 1.88083 19.5816 2.43873L12.0203 10L19.5816 17.5613C20.1395 18.1192 20.1395 19.0237 19.5816 19.5816C19.0237 20.1395 18.1192 20.1395 17.5613 19.5816L10 12.0203L2.43873 19.5816C1.88083 20.1395 0.976316 20.1395 0.418415 19.5816C-0.139472 19.0237 -0.139472 18.1192 0.418415 17.5613L7.97973 10L0.418415 2.43873C-0.139472 1.88083 -0.139472 0.976316 0.418415 0.418415Z"/></svg>';
		deleteBtn.className = "mediaload-delete";

		deleteBtn.addEventListener("click", (e) => {
			this.removeFile(file, container);
			e.stopPropagation(); // добавляем эту строку
		});

		imgdiv.appendChild(img);
		imgdiv.appendChild(deleteBtn);
		container.appendChild(imgdiv);

		this.ensureEmptyContainerExists();
	}

	removeFile(file, container) {
		this.selectedFiles = this.selectedFiles.filter((f) => f !== file);
		const dataTransfer = new DataTransfer();
		this.selectedFiles.forEach((f) => dataTransfer.items.add(f));
		this.input.files = dataTransfer.files;

		console.log(this.input.files);

		if (container && container.parentNode) {
			container.innerHTML = "";
		}
		this.ensureEmptyContainerExists();
	}

	ensureEmptyContainerExists() {
		const hasEmpty = this.imageContainers.some((container) => container.innerHTML.trim() === "");
		if (!hasEmpty) {
			const newContainer = this.createNewContainer();
			this.imageContainers.push(newContainer);
		}
	}
}
