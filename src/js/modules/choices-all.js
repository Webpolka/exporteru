/* ------------------------------------------------------------------------------------------------------------------------------
CHOICES 
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	function initOptions(select, list) {
		list.forEach((country) => {
			const option = document.createElement("option");
			option.value = country.value;
			option.label = country.label;
			select.appendChild(option);
		});
	}

	// Список категорий (потом будет ответ сервера в формате JSON)
	const categories = [
		{ value: "0", label: "Уголь" },
		{ value: "1", label: "Металлургия" },
		{ value: "2", label: "Рыба" },
		{ value: "3", label: "Масло" },
		{ value: "4", label: "Руда" },
		{ value: "5", label: "Напитки" },
		{ value: "6", label: "Древесина" },
		{ value: "7", label: "Медицина" },
	];

	const countries = [
		{
			label: "Россия",
			value: "ru",
			svg: `<svg viewBox="0 0 18 15" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="width:100%; height:auto;">
  <g clip-path="url(#clip0_424_15929)">
    <rect width="18" height="13.0909" transform="translate(0 0.954529)" fill="#1A47B8" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 9.68182H18V14.0455H0V9.68182Z" fill="#F93939" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.954529H18V5.31817H0V0.954529Z" fill="white" />
  </g>
  <defs>
    <clipPath id="clip0_424_15929">
      <rect width="18" height="13.0909" fill="white" transform="translate(0 0.954529)"/>
    </clipPath>
  </defs>
</svg>`,
		},
		{
			label: "Китай",
			value: "cn",
			svg: `<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid meet" style="width:100%; height:auto;">
  <g clip-path="url(#clip0_424_15942)">
    <rect width="18" height="13" fill="#F93939" />
    <path d="M16.2857 0H1.71429C0.767512 0 0 0.77604 0 1.73333V11.2667C0 12.224 0.767512 13 1.71429 13H16.2857C17.2325 13 18 12.224 18 11.2667V1.73333C18 0.77604 17.2325 0 16.2857 0Z" fill="#F93939" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.71211 6.26598L3.45211 6.93591L3.69211 5.51718L2.67383 4.51184L4.08211 4.30644L4.71211 3.01511L5.34126 4.30644L6.74954 4.51184L5.72954 5.51718L5.97126 6.93504L4.71211 6.26598ZM7.71383 2.59998H8.57097V3.46664H7.71383V2.59998ZM8.57097 4.33331H9.42811V5.19998H8.57097V4.33331ZM8.57097 6.06664H9.42811V6.93331H8.57097V6.06664ZM7.71383 7.79998H8.57097V8.66664H7.71383V7.79998Z" fill="#FFDA2C" />
  </g>
  <defs>
    <clipPath id="clip0_424_15942">
      <rect width="18" height="13" fill="white" />
    </clipPath>
  </defs>
</svg>`,
		},
		{
			label: "Казахстан",
			value: "kz",
			svg: `<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid meet" style="width:100%; height:auto;">
  <rect width="18" height="13" fill="#03BCDB" />
  <path d="M9.8577 7.80001C11.0412 7.80001 12.0006 6.82996 12.0006 5.63334C12.0006 4.43672 11.0412 3.46667 9.8577 3.46667C8.67423 3.46667 7.71484 4.43672 7.71484 5.63334C7.71484 6.82996 8.67423 7.80001 9.8577 7.80001Z" fill="#FFDA2C" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.85742 6.06665L7.71456 7.79998L9.85742 8.66665L12.0003 7.79998L12.8574 6.06665V8.66665L9.85742 9.53332L6.85742 8.66665V6.06665Z" fill="#FFDA2C" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.71484 2.16234C1.71484 1.92574 1.9137 1.73334 2.14342 1.73334C2.37999 1.73334 2.57199 1.92054 2.57199 2.16234V3.90434C2.57199 4.14094 2.37313 4.33334 2.14342 4.33334C1.90684 4.33334 1.71484 4.14614 1.71484 3.90434V2.16234ZM2.57199 3.89567C2.57199 3.65907 2.77084 3.46667 3.00056 3.46667C3.23713 3.46667 3.42913 3.65387 3.42913 3.89567V5.63767C3.42913 5.87427 3.23027 6.06667 3.00056 6.06667C2.76399 6.06667 2.57199 5.87947 2.57199 5.63767V3.89567ZM2.57199 7.36234C2.57199 7.12574 2.77084 6.93334 3.00056 6.93334C3.23713 6.93334 3.42913 7.12054 3.42913 7.36234V9.10434C3.42913 9.34094 3.23027 9.53334 3.00056 9.53334C2.76399 9.53334 2.57199 9.34614 2.57199 9.10434V7.36234V7.36234ZM1.71484 9.09567C1.71484 8.85907 1.9137 8.66667 2.14342 8.66667C2.37999 8.66667 2.57199 8.85387 2.57199 9.09567V10.8377C2.57199 11.0743 2.37313 11.2667 2.14342 11.2667C1.90684 11.2667 1.71484 11.0795 1.71484 10.8377V9.09567ZM1.71484 5.63334C1.71484 5.39414 1.9137 5.2 2.14342 5.2C2.37999 5.2 2.57199 5.40107 2.57199 5.63334C2.57199 5.87254 2.37313 6.06667 2.14342 6.06667C1.90684 6.06667 1.71484 5.8656 1.71484 5.63334ZM2.57199 2.16667C2.57199 1.92747 2.77084 1.73334 3.00056 1.73334C3.23713 1.73334 3.42913 1.9344 3.42913 2.16667C3.42913 2.40587 3.23027 2.6 3.00056 2.6C2.76399 2.6 2.57199 2.39894 2.57199 2.16667ZM1.71484 6.5C1.71484 6.2608 1.9137 6.06667 2.14342 6.06667C2.37999 6.06667 2.57199 6.26774 2.57199 6.5C2.57199 6.7392 2.37313 6.93334 2.14342 6.93334C1.90684 6.93334 1.71484 6.73227 1.71484 6.5ZM2.57199 10.8333C2.57199 10.5941 2.77084 10.4 3.00056 10.4C3.23713 10.4 3.42913 10.6011 3.42913 10.8333C3.42913 11.0725 3.23027 11.2667 3.00056 11.2667C2.76399 11.2667 2.57199 11.0656 2.57199 10.8333ZM1.71484 7.36667C1.71484 7.12747 1.9137 6.93334 2.14342 6.93334C2.37999 6.93334 2.57199 7.1344 2.57199 7.36667C2.57199 7.60587 2.37313 7.8 2.14342 7.8C1.90684 7.8 1.71484 7.59894 1.71484 7.36667Z" fill="#FFDA2C" />
</svg>`,
		},
		{
			label: "Белоруссия",
			value: "by",
			svg: `<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid meet" style="width:100%; height:auto;">
  <g clip-path="url(#clip0_424_15948)">
    <rect width="18" height="13" fill="#F93939" />
    <path d="M16.2857 0H1.71429C0.767512 0 0 0.77604 0 1.73333V11.2667C0 12.224 0.767512 13 1.71429 13H16.2857C17.2325 13 18 12.224 18 11.2667V1.73333C18 0.77604 17.2325 0 16.2857 0Z" fill="#F93939" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.28516 9.53333H17.9994V13H4.28516V9.53333Z" fill="#249F58" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.57143 0L4.28571 1.3L2.57143 2.6V0ZM2.57143 2.6L4.28571 3.9L2.57143 5.2V2.6ZM2.57143 5.2L4.28571 6.5L2.57143 7.8V5.2ZM2.57143 7.8L4.28571 9.1L2.57143 10.4V7.8ZM2.57143 10.4L4.28571 11.7L2.57143 13V10.4ZM1.71429 0L0 1.3L1.71429 2.6V0ZM1.71429 2.6L0 3.9L1.71429 5.2V2.6ZM1.71429 5.2L0 6.5L1.71429 7.8V5.2ZM1.71429 7.8L0 9.1L1.71429 10.4V7.8ZM1.71429 10.4L0 11.7L1.71429 13V10.4ZM1.71429 0H2.57143V1.73333H1.71429V0ZM1.71429 11.2667H2.57143V13H1.71429V11.2667ZM1.71429 4.33333H2.57143V6.06667H1.71429V4.33333ZM1.71429 2.6H2.57143V3.46667H1.71429V2.6ZM1.71429 9.53333H2.57143V10.4H1.71429V9.53333ZM1.71429 6.93333H2.57143V8.66667H1.71429V6.93333Z" fill="white" />
  </g>
  <defs>
    <clipPath id="clip0_424_15948">
      <rect width="18" height="13" fill="white" />
    </clipPath>
  </defs>
</svg>`,
		},
	];

	/*------------------------------------------------------- АВТОРИЗАЦИЯ --------------------------------------------------*/

	// Инициализация селекта ВЫБОРА СТРАНЫ на странице АВТОРИЗАЦИИ для Я ПОКУПАТЕЛЬ
	const authorizeBuyerCountry = document.getElementById("authorize-buyer-country");
	if (authorizeBuyerCountry) {
		initOptions(authorizeBuyerCountry, countries);
		const choices = new Choices(authorizeBuyerCountry, {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,

			callbackOnCreateTemplates: function (template) {
				return {
					item: (classNames, data) => {
						const country = countries.find((c) => c.value === data.value);
						const svgFlag = `${country.svg}`;
						return template(`
            <div class="wl-item" data-select-text="${this.config.itemSelectText}"
            data-choice data-id="${data.id}" data-value="${data.value}" ${data.disabled ? "data-disabled" : ""}>
            <span class="wl-item__wrap">
                <span class="wl-item__flag">${svgFlag}</span>
                <span class="wl-item__label">${data.label}</span>
            </span>           
          </div>
        `);
					},

					choice: (classNames, data) => {
						const country = countries.find((c) => c.value === data.value);
						const svgFlag = `${country.svg}`;
						return template(`
            <div class="wl-choice ${data.selected ? "wl-choice--checked" : ""}" data-select-text="${this.config.itemSelectText}"
            data-choice data-id="${data.id}" data-value="${data.value}" ${data.disabled ? "data-disabled" : ""}>
            <span class="wl-choice__wrap">
                <span class="wl-choice__flag">${svgFlag}</span>
                <span class="wl-choice__label">${data.label}</span>
            </span>
            <span class="wl-choice__checkbox ${data.selected ? "wl-choice__checkbox--checked" : ""}"></span>
          </div>
        `);
					},
				};
			},
		});
	}

	// Инициализация селекта ВЫБОРА СТРАН на странице АВТОРИЗАЦИИ для Я ПРОДАВЕЦ
	const authorizeSellerCountries = document.getElementById("authorize-seller-countries");
	if (authorizeSellerCountries) {
		initOptions(authorizeSellerCountries, countries);
		const choices = new Choices(authorizeSellerCountries, {
			searchEnabled: false,
			searchChoices: false,
			itemSelectText: false,
			removeItemButton: true,
			renderSelectedChoices: "always",

			callbackOnCreateTemplates: function (template) {
				return {
					choice: (classNames, data) => {
						const country = countries.find((c) => c.value === data.value);
						const svgFlag = `${country.svg}`;
						return template(`
            <div class="wl-choice ${data.selected ? "wl-choice--checked" : ""}" data-select-text="${this.config.itemSelectText}"
            data-choice data-id="${data.id}" data-value="${data.value}" ${data.disabled ? "data-disabled" : ""}>
            <span class="wl-choice__wrap">
                <span class="wl-choice__flag">${svgFlag}</span>
                <span class="wl-choice__label">${data.label}</span>
            </span>
            <span class="wl-choice__checkbox ${data.selected ? "wl-choice__checkbox--checked" : ""}"></span>
          </div>
        `);
					},
				};
			},
		});
	}

	/*------------------------------------------------------- ЛИЧНЫЙ КАБИНЕТ --------------------------------------------------*/

	// Инициализация селекта выбора СТРАНЫ на странице ЛИЧНЫЕ ДАННЫЕ (Я ПОКУПАТЕЛЬ)
	const buyerPesonalCountry = document.getElementById("buyer-personal-counrty");
	if (buyerPesonalCountry) {
		initOptions(buyerPesonalCountry, countries);
		const choices = new Choices(buyerPesonalCountry, {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,

			callbackOnCreateTemplates: function (template) {
				return {
					item: (classNames, data) => {
						const country = countries.find((c) => c.value === data.value);
						const svgFlag = `${country.svg}`;
						return template(`
            <div class="wl-item" data-select-text="${this.config.itemSelectText}"
            data-choice data-id="${data.id}" data-value="${data.value}" ${data.disabled ? "data-disabled" : ""}>
            <span class="wl-item__wrap">
                <span class="wl-item__flag">${svgFlag}</span>
                <span class="wl-item__label">${data.label}</span>
            </span>           
          </div>
        `);
					},

					choice: (classNames, data) => {
						const country = countries.find((c) => c.value === data.value);
						const svgFlag = `${country.svg}`;
						return template(`
            <div class="wl-choice ${data.selected ? "wl-choice--checked" : ""}" data-select-text="${this.config.itemSelectText}"
            data-choice data-id="${data.id}" data-value="${data.value}" ${data.disabled ? "data-disabled" : ""}>
            <span class="wl-choice__wrap">
                <span class="wl-choice__flag">${svgFlag}</span>
                <span class="wl-choice__label">${data.label}</span>
            </span>
            <span class="wl-choice__checkbox ${data.selected ? "wl-choice__checkbox--checked" : ""}"></span>
          </div>
        `);
					},
				};
			},
		});
	}

	// Инициализация селекта выбора СТРАНЫ на странице ЛИЧНЫЕ ДАННЫЕ (Я ПРОДАВЕЦ)
	const sellerPesonalCountry = document.getElementById("seller-personal-country");
	if (sellerPesonalCountry) {
		initOptions(sellerPesonalCountry, countries);
		const choices = new Choices(sellerPesonalCountry, {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,

			callbackOnCreateTemplates: function (template) {
				return {
					item: (classNames, data) => {
						const country = countries.find((c) => c.value === data.value);
						const svgFlag = `${country.svg}`;
						return template(`
            <div class="wl-item" data-select-text="${this.config.itemSelectText}"
            data-choice data-id="${data.id}" data-value="${data.value}" ${data.disabled ? "data-disabled" : ""}>
            <span class="wl-item__wrap">
                <span class="wl-item__flag">${svgFlag}</span>
                <span class="wl-item__label">${data.label}</span>
            </span>           
          </div>
        `);
					},

					choice: (classNames, data) => {
						const country = countries.find((c) => c.value === data.value);
						const svgFlag = `${country.svg}`;
						return template(`
            <div class="wl-choice ${data.selected ? "wl-choice--checked" : ""}" data-select-text="${this.config.itemSelectText}"
            data-choice data-id="${data.id}" data-value="${data.value}" ${data.disabled ? "data-disabled" : ""}>
            <span class="wl-choice__wrap">
                <span class="wl-choice__flag">${svgFlag}</span>
                <span class="wl-choice__label">${data.label}</span>
            </span>
            <span class="wl-choice__checkbox ${data.selected ? "wl-choice__checkbox--checked" : ""}"></span>
          </div>
        `);
					},
				};
			},
		});
	}

	// Инициализация селекта выбора КАТЕГОРИИ ТОВАРА на странице ЛИЧНЫЕ ДАННЫЕ (Я ПРОДАВЕЦ)
	const sellerPesonalCategories = document.getElementById("seller-personal-categories");
	if (sellerPesonalCategories) {
		initOptions(sellerPesonalCategories, categories);
		const choices = new Choices(sellerPesonalCategories, {
			searchEnabled: false,
			searchChoices: false,
			itemSelectText: false,
			removeItemButton: true,
			renderSelectedChoices: "always",

			callbackOnCreateTemplates: function (template) {
				return {
					choice: (classNames, data) => {
						const country = countries.find((c) => c.value === data.value);
						return template(`
            <div class="wl-choice ${data.selected ? "wl-choice--checked" : ""}" data-select-text="${this.config.itemSelectText}"
            data-choice data-id="${data.id}" data-value="${data.value}" ${data.disabled ? "data-disabled" : ""}>
            <span class="wl-choice__label">${data.label}</span>            
            <span class="wl-choice__checkbox ${data.selected ? "wl-choice__checkbox--checked" : ""}"></span>
          </div>
        `);
					},
				};
			},
		});
		choices.setChoiceByValue([categories[0].value, categories[1].value]);
	}

	// Инициализация селекта выбора КАТЕГОРИЙ на странице СОЗДАТЬ ТОВАР (Я ПРОДАВЕЦ)
	const sellerCreateCategory = document.getElementById("seller-create-category");
	if (sellerCreateCategory) {
		initOptions(sellerCreateCategory, categories);
		const choices = new Choices(sellerCreateCategory, {
			placeholder: true,
			placeholderValue: "Выберите категории товара",
			searchEnabled: false,
			searchChoices: false,
			itemSelectText: false,
			removeItemButton: true,
			searchPlaceholderValue: "Выберите категории товара",
			renderSelectedChoices: "always",

			callbackOnCreateTemplates: function (template) {
				return {
					choice: (classNames, data) => {
						const country = countries.find((c) => c.value === data.value);
						return template(`
            <div class="wl-choice ${data.selected ? "wl-choice--checked" : ""}" data-select-text="${this.config.itemSelectText}"
            data-choice data-id="${data.id}" data-value="${data.value}" ${data.disabled ? "data-disabled" : ""}>
            <span class="wl-choice__label">${data.label}</span>            
            <span class="wl-choice__checkbox ${data.selected ? "wl-choice__checkbox--checked" : ""}"></span>
          </div>
        `);
					},
				};
			},
		});

		// Получаем ссылку на поисковое поле внутри Choices
		
		const inputField = sellerCreateCategory.closest(".choices").querySelector('input[type="search"]');

		// Функция для скрытия или отображения input
		function toggleInputVisibility() {
			const selectedItems = choices.getValue(true); // массив выбранных значений
			if (selectedItems.length > 0) {
				inputField.style.display = "none";
			} else {
				inputField.style.display = "";
			}
		}

		// Обработчик события при изменении выбора
		choices.passedElement.element.addEventListener("choice", toggleInputVisibility);
		choices.passedElement.element.addEventListener("removeItem", toggleInputVisibility);

		// Вызовем сразу, чтобы установить правильное состояние при инициализации
		toggleInputVisibility();
	}
});

/*--------------------------------------------------------------------------------------------------------------
CHOICES ORDERBY IN FILTER 
----------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const searchFilterSelect = document.getElementById("search-filter-select");
	if (searchFilterSelect) {
		const choices = new Choices(searchFilterSelect, {
			searchEnabled: false,
			itemSelectText: "",
		});

		// управляем открытием через API
		document.getElementById("search-filter-toggle").addEventListener("click", () => {
			choices.showDropdown(); // открыть/закрыть
		});
	}
});
