// render single restaurant card to DOM
// ingredients must be ARRAY of string ingredients
var renderToDOM = (name, location, ingredients) => {
  // card element
  card = document.createElement("div");
  card.classList += "restaurant-card";
  // add h3 for name
  nameH3 = document.createElement("h3");
  nameH3.classList += "name";
  nameH3.textContent = name;
  card.appendChild(nameH3);
  // location paragraph
  locationP = document.createElement("p");
  locationP.classList += "location";
  // split based on commas, then get last word of the first element from split
  let city = location
    .split(",")[0]
    .split(" ")
    .reverse()[0]
    .trim()
    .toUpperCase();
  locationP.textContent = city;
  card.appendChild(locationP);
  // ingredients paragraph
  ingredientsP = document.createElement("p");
  ingredientsP.classList += "ingredients";
  ingredientsP.textContent = ingredients.join(", ");
  card.appendChild(ingredientsP);
  grid = document.getElementById("rest-grid");
  grid.appendChild(card);
  console.log(card);
};

renderToDOM(
  "Mountain Mike's Pizza",
  "12850 Saratoga Sunnyvale Rd SARATOGA, CA 95070",
  ["pepper", "sugar", "meat"]
);

// get all restaurant cards and apply column classes
$(".restaurant-card").addClass(
  "col col-sm-6 col-md-4 col-lg-3 shadow card card-body"
);

// quick search regex
var qsRegex;

// init Isotope
var $grid = $(".grid").isotope({
  itemSelector: ".restaurant-card",
  layoutMode: "fitRows",
  filter: function () {
    return qsRegex ? $(this).find(".ingredients").text().match(qsRegex) : true;
  },
});

// use value of ingredient field to filter
var $quicksearch = $("#search-ingredient").keyup(
  debounce(function () {
    qsRegex = new RegExp($quicksearch.val(), "gi");
    $grid.isotope({
      filter: function () {
        if (qsRegex) {
          if (qsRegex2) {
            return (
              $(this).find(".location").text().match(qsRegex2) &&
              $(this).find(".ingredients").text().match(qsRegex)
            );
          } else {
            return $(this).find(".ingredients").text().match(qsRegex);
          }
        } else return true;
      },
    });
  }, 200)
);

var qsRegex2;
// use value of location field to filter
var $quicksearch2 = $("#search-location").keyup(
  debounce(function () {
    qsRegex2 = new RegExp($quicksearch2.val(), "gi");
    $grid.isotope({
      filter: function () {
        if (qsRegex2) {
          if (qsRegex) {
            return (
              $(this).find(".location").text().match(qsRegex2) &&
              $(this).find(".ingredients").text().match(qsRegex)
            );
          } else {
            return $(this).find(".location").text().match(qsRegex2);
          }
        } else return true;
      },
    });
  }, 200)
);

// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout(timeout);
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply(_this, args);
    }
    timeout = setTimeout(delayed, threshold);
  };
}
