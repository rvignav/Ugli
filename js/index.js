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
  if (!doc.data().name.toLowerCase().includes("test")) {
    renderToDOM(doc.data().name, doc.data().city, ingredients, doc.id, doc.data().phone);
  }
}

// render single restaurant card to DOM
// ingredients must be ARRAY of string ingredients
function renderToDOM(name, location, ingredients, id, phone) {
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
  location = location.toLowerCase().trim();
  let firstLetter = location.substring(0, 1).toUpperCase();
  location = firstLetter + location.slice(1);
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
  let button = document.createElement("button");
  button.classList += "btn btn-outline-primary send";
  button.innerText = "Contact";
  button.setAttribute("onClick", `send("${phone}")`);
  card.appendChild(button);
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

  function filterRestaurants() {
    let ingMatch = $("#search-ingredient").val();
    let cityMatch = $("#search-location").val();
    $(".restaurant-card").filter((index) => {
      console.log($(this));
    });
  }
}

function send(phone) {
  console.log(phone);
  to = phone;
  console.log(to);
}
