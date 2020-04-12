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
  let data = doc.data();
  let ing = data.ingredients;
  let ingredients = [];

  // Create items array
  ing = Object.keys(ing).map(function (key) {
    return [key, ing[key]];
  });

  // Sort the array based on the second element
  ing.sort(function (first, second) {
    return second[1] - first[1];
  });

  for (let i = 0; i < ing.length; i++) {
    ingredients.push(ing[i][0]);
  }

  if (!data.name.toLowerCase().includes("test")) {
    renderToDOM(data.name, data.city, ingredients, doc.id, data.phone);
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
  button.classList += "btn btn-primary send mr-1";
  button.innerText = "Contact";
  button.setAttribute("onClick", `send("${phone}")`);
  card.appendChild(button);
  viewButton = document.createElement("button");
  viewButton.classList += "btn btn-outline-primary";
  viewButton.setAttribute("data-toggle", "modal");
  viewButton.setAttribute("data-target", "#ingmodal");
  viewButton.innerText = "All Ingredients";
  viewButton.setAttribute("onClick", `setModalTextTo("${ingredients.join(", ")}")`);
  card.appendChild(viewButton);
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
    ingMatch = ingMatch.toLowerCase();
    cityMatch = cityMatch.toLowerCase();

    let cards = document.getElementsByClassName("restaurant-card");
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      if (ingMatch == "" && cityMatch == "") {
        card.style.display = "none";
        continue;
      }

      if (
        card.children[2].textContent.toLowerCase().includes(ingMatch) &&
        card.children[1].textContent.toLowerCase().includes(cityMatch)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  }
}

function send(phone) {
  to = phone;
  console.log(to);
  window.location.href = "../message.html";
}

function setModalTextTo(text) {
  let modalText = document.getElementById('modify');
  console.log(text);
  modalText.textContent = text;
}