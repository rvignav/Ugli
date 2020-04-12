async function renderRestaurants() {
  await db
    .collection("Restaurants")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        renderFireRestaurant(doc);
      });
    });
}

function renderFireRestaurant(doc) {
  let data = doc.data().ingredients;
  let ingredients = [];
  Object.keys(data).forEach(function (key) {
    ingredients.push(key);
  });
  if (!doc.data().name.toLowercase().contains("test")) {
    renderToDOM(doc.data().name, doc.data().city, ingredients, doc.id);
  }
}

// render single restaurant card to DOM
// ingredients must be ARRAY of string ingredients
function renderToDOM(name, location, ingredients, id) {
  // card element
  card = document.createElement("div");
  card.classList +=
    "restaurant-card col col-sm-10 col-md-5 col-lg-3 shadow-lg card card-body rounded";
  // add h3 for name
  nameH3 = document.createElement("h3");
  nameH3.classList += "name";
  nameH3.textContent = name;
  card.appendChild(nameH3);
  // location paragraph
  locationP = document.createElement("p");
  locationP.classList += "location";
  location = location.toLowerCase();
  let firstLetter = location.substring(0, 1).toUpperCase();
  location = firstLetter + location.substring(1).toLowerCase();
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
main();
async function main() {
  await renderRestaurants();

  // quick search regex
  var qsRegex;

  $("#search-ingredient").keyup(function () {
    filterRestaurants();
  });

  $("#search-location").keyup(function () {
    filterRestaurants();
  });

  let restCards = document.querySelectorAll(".restaurant-card");
  function filterRestaurants() {
    // filter all by ingredient
    for (let i = 0; i < restCards.length; i++) {
      if (
        restCard[i].children[2]
          .text()
          .includes($("#search-ingredient").val()) &&
        restCard[i].children[1].text().includes($("#search-location").val())
      ) {
        restCard[i].style.display = "block";
      } else {
        restCard[i].style.display = "none";
      }
    }
  }
}
