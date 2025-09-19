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
