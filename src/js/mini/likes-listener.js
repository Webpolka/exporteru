/*--------------------------------------------------------------------------------------------------------------
LIKES LISTENER 
----------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const allFavoursLiked = document.querySelectorAll("[data-likeID]");
	allFavoursLiked.forEach((like) => {
		like.addEventListener("click", function (e) {
			e.preventDefault();
			e.stopPropagation();
			this.classList.toggle("active");
		});
	});
});
