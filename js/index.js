function renderRestaurants() {
  console.log("Rendering restaurants...");
  db.collection("Restaurants")
    .orderBy("city")
    .onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type == "added") {
          renderFireRestaurant(change.doc);
        } else if (change.type == "removed") {
          let card = $(`[data-id=${change.doc.id}]`);
          document.getElementById("rest-grid").removeChild(card);
        }
      })
    });
}

function renderFireRestaurant(doc) {
  let data = doc.data().ingredients;
  let ingredients = [];
  Object.keys(data).forEach(function (key) {
    ingredients.push(key);
  });
  var city = doc.data().city.toLowerCase().trim();
  renderToDOM(doc.data().name, city.charAt(0).toUpperCase() + city.slice(1), ingredients, doc.id);
  console.log(`${doc.id} has been rendered.`);
}

// render single restaurant card to DOM
// ingredients must be ARRAY of string ingredients
function renderToDOM(name, location, ingredients, id) {
  // card element
  card = document.createElement("div");
  card.classList +=
    "restaurant-card col col-sm-6 col-md-4 col-lg-3 shadow card card-body";
  // add h3 for name
  nameH3 = document.createElement("h3");
  nameH3.classList += "name";
  nameH3.textContent = name;
  card.appendChild(nameH3);
  // location paragraph
  locationP = document.createElement("p");
  locationP.classList += "location";
  locationP.textContent = location;
  card.appendChild(locationP);
  // ingredients paragraph
  ingredientsP = document.createElement("p");
  ingredientsP.classList += "ingredients";
  if (ingredients.length >= 15) {
    let text = document.createTextNode(ingredients.slice(0, 14).join(", "));
    let more = document.createElement("span");
    more.textContent = " and many more...";
    more.classList += "more";
    let restOfText = document.createElement("span");
    restOfText.classList += "hidden";
    restOfText.innerText = ingredients.slice(3);
    ingredientsP.appendChild(text);
    ingredientsP.appendChild(more);
    ingredientsP.appendChild(restOfText);
  } else {
    ingredientsP.textContent = ingredients.join(", ");
  }
  card.appendChild(ingredientsP);
  grid = document.getElementById("rest-grid");
  grid.appendChild(card);
}

renderRestaurants();

console.log("Beginning filtering");
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
