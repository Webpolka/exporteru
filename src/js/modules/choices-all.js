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

	// Инициализация селекта выбора СТРАНЫ на странице ЛИЧНЫЕ ДАННЫЕ (Я ПРОДАВЕЦ)
	const sellerPesonalCountry = document.getElementById("seller-personal-country");
	if (sellerPesonalCountry) {
		const choices = new Choices(sellerPesonalCountry, {
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
