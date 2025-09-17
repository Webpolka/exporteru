/*--------------------------------------------------------------------------------------------------------------
CHOICES ADD SEARCH FILTER 
----------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const searchFilterSelect = document.getElementById("search-filter-select");
	const choices = new Choices(searchFilterSelect, {
		searchEnabled: false,
		itemSelectText: "",
	});

	// управляем открытием через API
	document.getElementById("search-filter-toggle").addEventListener("click", () => {
		choices.showDropdown(); // открыть/закрыть
	});
});
