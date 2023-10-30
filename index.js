document.addEventListener("DOMContentLoaded", function () {
  const minYearSelect = document.getElementById("minYear");
  const maxYearSelect = document.getElementById("maxYear");
  const carMakeSelect = document.getElementById("carMake");
  const mileageSelect = document.getElementById("mileage");
  const priceSelect = document.getElementById("price");
  const colorSelect = document.getElementById("color");
  const cards = document.querySelectorAll(".card");
  //triggers the filter function if any of the dropdown menus are changed
  minYearSelect.addEventListener("change", filterElements);
  maxYearSelect.addEventListener("change", filterElements);
  carMakeSelect.addEventListener("change", filterElements);
  mileageSelect.addEventListener("change", filterElements);
  priceSelect.addEventListener("change", filterElements);
  colorSelect.addEventListener("change", filterElements);

  function filterElements() {
    //the selected values from the dropdown menus
    let minYear = minYearSelect.value;
    let maxYear = maxYearSelect.value;
    let selectedCarMake = carMakeSelect.value;
    let maxMileage = mileageSelect.value;
    let maxPrice = priceSelect.value;
    let selectedColor = colorSelect.value;

    if (minYearSelect.value === "") {
      minYear = 0;
    }
    if (maxYearSelect.value === "") {
      maxYear = Infinity;
    }

    maxPrice = maxPrice === "" ? Infinity : parseInt(maxPrice, 10);
    maxMileage = maxMileage === "" ? Infinity : parseInt(maxMileage, 10);

    cards.forEach(function (card) {
      //gets the filterable value from each card
      const yearCard = card.querySelector("h1:nth-of-type(1)");
      const makeCard = card.querySelector("h1:nth-of-type(2)");
      const mileageCard = card.querySelector("h1:nth-of-type(4)");
      const priceCard = card.querySelector("h1:nth-of-type(5)");
      const colorCard = card.querySelector("h1:nth-of-type(6)");

      if (yearCard && makeCard && mileageCard && priceCard && colorCard) {
        //parses the filterable value from each card so you can compare with values from dropdown menus
        const year = parseInt(yearCard.textContent.split(" ")[1], 10);
        const make = makeCard.textContent.split(" ")[1];
        const mileage = parseInt(mileageCard.textContent.split(" ")[1], 10);
        const price = parseInt(priceCard.textContent.split("$")[1], 10);
        const color = colorCard.textContent.split(" ")[1];
        //values that decide if cards will be filtered
        const yearFilter = year >= minYear && year <= maxYear;
        const makeFilter = selectedCarMake === "" || make === selectedCarMake;
        const mileageFilter = maxMileage === Infinity || mileage <= maxMileage;
        const priceFilter = maxPrice === Infinity || price <= maxPrice;
        const colorFilter = selectedColor === "" || color === selectedColor;
        //filters cards
        if (
          yearFilter &&
          makeFilter &&
          mileageFilter &&
          priceFilter &&
          colorFilter
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });
  }
});
