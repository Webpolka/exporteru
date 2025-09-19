/* ------------------------------------------------------------------------------------------------------------------------------
TRANSFER ELEMENTS
--------------------------------------------------------------------------------------------------------------------------------*/
import TransferElements from "../modules/transfer";

const searchFormInHeader = document.getElementById("search-form");
const placeForSearchForm = document.getElementById("for-sm-search-form");

if (searchFormInHeader && placeForSearchForm) {
    new TransferElements({
        sourceElement: searchFormInHeader,
        breakpoints: {
            992: {
                targetElement: placeForSearchForm,
            },
        },
    });
}


const popularCatsButton = document.getElementById("popularcats-button");
const popularCatsPlace = document.getElementById("popularcats-place");

if (popularCatsButton && popularCatsPlace) {
    new TransferElements({
        sourceElement: popularCatsButton,
        breakpoints: {
            576: {
                targetElement: popularCatsPlace,
            },
        },
    });
}

const advantageArrows = document.getElementById("advantages-arrows");
const advantageArrowsPlace = document.getElementById("advantages-arrows-place");

if (advantageArrows && advantageArrowsPlace) {
    new TransferElements({
        sourceElement: advantageArrows,
        breakpoints: {
            768: {
                targetElement: advantageArrowsPlace,
                targetPosition: 1,
            },
        },
    });
}

const popularProdGroup = document.getElementById("popularprod-navig-group");
const popularProdGroupPlace = document.getElementById("popularprod-sm-place");

if (popularProdGroup && popularProdGroupPlace) {
    new TransferElements({
        sourceElement: popularProdGroup,
        breakpoints: {
            768: {
                targetElement: popularProdGroupPlace,
            },
        },
    });
}
