document.addEventListener("DOMContentLoaded", () => {
	const popup = document.getElementById("formPopup");
	const openPopupbtn = document.querySelector("#open-popup-btn");
	const closeBtn = popup.querySelector(`[data-popup="close"]`);

	if (popup && openPopupbtn) {
		openPopupbtn.addEventListener("click", (e) => {
			e.preventDefault();
			popup.classList.add("popup--show");
		});
		closeBtn.addEventListener("click", (e) => {
			e.preventDefault();
			popup.classList.remove("popup--show");
		});
	}
});
