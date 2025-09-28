/* ------------------------------------------------------------------------------------------------------------------------------
CHOICES AUTHORIZE BUYER
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const authorizeSelect = document.querySelector("#authorize-buyer-country");

	if (authorizeSelect) {
		const choices = new Choices("#authorize-buyer-country", {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,
			choices: [
				{ value: "ru", label: "Россия" },
				{ value: "kz", label: "Казахстан" },
				{ value: "cn", label: "Китай" },
				{ value: "by", label: "Беларусь" },
			],
		});
	}
});

/* ------------------------------------------------------------------------------------------------------------------------------
CHOICES AUTHORIZE SELLER
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const authorizeSelect = document.querySelector("#authorize-seller-countries");
	const buyerPesonalCountry = document.querySelector("#buyer-personal-counrty");

	const countryList = [
		{ value: "ru", label: "Россия" },
		{ value: "kz", label: "Казахстан" },
		{ value: "cn", label: "Китай" },
		{ value: "by", label: "Беларусь" },
	];

	if (authorizeSelect) {
		const choices = new Choices(authorizeSelect, {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,
			choices: countryList,
		});
	}

	if (buyerPesonalCountry) {
		const choices = new Choices(buyerPesonalCountry, {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,
			choices: countryList,
		});
	}
});

/* ------------------------------------------------------------------------------------------------------------------------------
CHOICES AUTHORIZE 
--------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const authorizeSelect = document.querySelector("#authorize-country");

	if (authorizeSelect) {
		const choices = new Choices("#authorize-country", {
			searchEnabled: false,
			itemSelectText: "",
			removeItemButton: false,
			choices: [
				{ value: "ru", label: "Россия" },
				{ value: "kz", label: "Казахстан" },
				{ value: "cn", label: "Китай" },
				{ value: "by", label: "Беларусь" },
			],
		});
	}
});

/*--------------------------------------------------------------------------------------------------------------
CHOICES ADD SEARCH FILTER 
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
