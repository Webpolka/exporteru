/* ------------------------------------------------------------------------------------------------------------------------------
CHOICES 
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	// Список стран (потом будет ответ сервера в формате JSON)
	const countryList = [
		{ value: "ru", label: "Россия" },
		{ value: "kz", label: "Казахстан" },
		{ value: "cn", label: "Китай" },
		{ value: "by", label: "Беларусь" },
	];

	// Список категорий (потом будет ответ сервера в формате JSON)
	const CategoryList = [
		{ value: "0", label: "Уголь" },
		{ value: "1", label: "Металлургия" },
		{ value: "2", label: "Рыба" },
		{ value: "3", label: "Масло" },
		{ value: "4", label: "Руда" },
		{ value: "5", label: "Напитки" },
		{ value: "6", label: "Древесина" },
		{ value: "7", label: "Медицина" },
	];

	const countryFlags = [
		{
			name: "Россия",
			value: "ru",
			svg: `<svg width="20" height="15" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="15" fill="#fff"/>
      <rect width="20" height="5" fill="#0052b4"/>
      <rect y="5" width="20" height="5" fill="#fff"/>
      <rect y="10" width="20" height="5" fill="#d52b1e"/>
    </svg>`,
		},
		{
			name: "Китай",
			value: "cn",
			svg: `<svg width="20" height="15" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="15" fill="#de2910"/>
      <circle cx="5" cy="3" r="1.5" fill="#ffde00"/>
      <circle cx="7" cy="3" r="1.5" fill="#ffde00"/>
      <circle cx="9" cy="3" r="1.5" fill="#ffde00"/>
      <circle cx="11" cy="3" r="1.5" fill="#ffde00"/>
      <circle cx="13" cy="3" r="1.5" fill="#ffde00"/>
    </svg>`,
		},
		{
			name: "Узбекистан",
			value: "uz",
			svg: `<svg width="20" height="15" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="15" fill="#009639"/>
      <circle cx="10" cy="7.5" r="3" fill="#fff"/>
    </svg>`,
		},
		{
			name: "Белоруссия",
			value: "by",
			svg: `<svg width="20" height="15" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="15" fill="#fff"/>
      <rect y="5" width="20" height="5" fill="#d52b1e"/>
      <rect y="7" width="20" height="1" fill="#000"/>
    </svg>`,
		},
	];

	/*------------------------------------------------------- АВТОРИЗАЦИЯ --------------------------------------------------*/

	// Инициализация селекта ВЫБОРА СТРАНЫ на странице АВТОРИЗАЦИИ для Я ПОКУПАТЕЛЬ
	const authorizeBuyerCountry = document.getElementById("authorize-buyer-country");
	if (authorizeBuyerCountry) {
		const choices = new Choices(authorizeBuyerCountry, {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,
			choices: countryList,
		});
	}

	// Инициализация селекта ВЫБОРА СТРАН на странице АВТОРИЗАЦИИ для Я ПРОДАВЕЦ
	const authorizeSellerCountries = document.getElementById("authorize-seller-countries");
	if (authorizeSellerCountries) {
		const choices = new Choices(authorizeSellerCountries, {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,
			choices: countryList,
		});
	}

	/*------------------------------------------------------- ЛИЧНЫЙ КАБИНЕТ --------------------------------------------------*/

	// Инициализация селекта выбора СТРАНЫ на странице ЛИЧНЫЕ ДАННЫЕ (Я ПОКУПАТЕЛЬ)
	const buyerPesonalCountry = document.getElementById("buyer-personal-counrty");
	if (buyerPesonalCountry) {
		const choices = new Choices(buyerPesonalCountry, {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,
			choices: countryList,
		});
	}

	const countryChoices = countryFlags.map((country) => ({
		value: country.value,
		label: country.name,
		customSVG: country.svg,
	}));

	// Инициализация селекта выбора СТРАНЫ на странице ЛИЧНЫЕ ДАННЫЕ (Я ПРОДАВЕЦ)
	const sellerPesonalCountry = document.getElementById("seller-personal-country");
	if (sellerPesonalCountry) {
		const choicesFlags = new Choices(sellerPesonalCountry, {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,
			choices: countryList,
		});
	}

	// Инициализация селекта выбора КАТЕГОРИИ ТОВАРА на странице ЛИЧНЫЕ ДАННЫЕ (Я ПРОДАВЕЦ)
	const sellerPesonalCategories = document.getElementById("seller-personal-categories");
	if (sellerPesonalCategories) {
		const choices = new Choices(sellerPesonalCategories, {
			// placeholder: true,
			// placeholderValue: "Выберите из списка...",
			searchEnabled: false,
			choices: CategoryList,
			items: CategoryList,
			removeItemButton: true,
			maxItemCount: 5,
			itemSelectText: false,
			maxItemText: (maxItemCount) => {
				return `Только ${maxItemCount} позволено`;
			},
		});
		choices.setChoiceByValue([CategoryList[0].value, CategoryList[1].value]);
	}

	// Инициализация селекта выбора КАТЕГОРИЙ на странице СОЗДАТЬ ТОВАР (Я ПРОДАВЕЦ)
	const sellerCreateCategory = document.getElementById("seller-create-category");
	if (sellerCreateCategory) {
		const choices = new Choices(sellerCreateCategory, {
			placeholder: true,
			placeholderValue: "Выберите категории товара",
			searchEnabled: false,
			choices: CategoryList,
			items: CategoryList,
			removeItemButton: true,
			maxItemCount: 5,
			itemSelectText: false,
			maxItemText: (maxItemCount) => {
				return `Только ${maxItemCount} позволено`;
			},
		});
		// Обработчик события изменения выбора
		choices.passedElement.element.addEventListener("change", function () {
			// Проверяем, есть ли выбранные элементы
			const selectedItems = choices.getValue(true); // возвращает массив выбранных значений
			const target = document.querySelector(".choices__input.choices__input--cloned");
			selectedItems.length > 0 ? (target.style.display = "none") : (target.style.display = "block");
		});
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
