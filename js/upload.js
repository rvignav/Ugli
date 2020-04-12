async function getIngredients(name) {
  var data = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=" + name, {
      method: 'GET',
      headers: {
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "ecca05990bmsh826ddb1c8d1e3d3p15b3ccjsn9d5f14ee012e"
      }
  });
  var json = await data.json();
  var id = json.results[0].id;
  if (id) {
      var query = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information", {
          method: 'GET',
          headers: {
              "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
              "x-rapidapi-key": "ecca05990bmsh826ddb1c8d1e3d3p15b3ccjsn9d5f14ee012e"
          }
      });
      var ingredients = [];
      const json1 = await query.json();
      json1.extendedIngredients.forEach((i) => {
          ingredients.push(i.name);
      });
      console.log(ingredients);
      return ingredients;
  }
}
var display = "";
var loadFile = function (event) {
  console.log("in here");
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
    console.log('2');
    var menu = [];
    var count = 0;
    
    const worker = Tesseract.createWorker({
        logger: m => console.log(m)
      });
      
      (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        var { data: { text } } = await worker.recognize(image.src);
        while (text.indexOf("$") != -1) {
            text = text.replace("$", "");
        }
        while (text.indexOf("CHEF’S TASTING MENU") != -1) {
            text = text.replace("CHEF’S TASTING MENU", "");
        }
        while (text.indexOf("APPETIZERS\n") != -1) {
            text = text.replace("APPETIZERS\n", "");
        }
        while (text.indexOf("ENTREES\n") != -1) {
            text = text.replace("ENTREES\n", "");
        }
      //   while (text.indexOf("DESSERT") != -1) {
      //     text = text.replace("DESSERT", "");
      // }
        text = text.replace(/[0-9]/g, '');
        // text = text.replace(/^Lo(.*)$/mg, "");
        text = text.replace(/\n\s*\n/g, '\n');
        lines = text.split("\n");
        console.log("Length: " + lines.length)
        for (var i = 0; i < lines.length; i++) {
          console.log("LINE: " + lines[i]);
            if (lines[i].replace(/\s/g, "").length != 0 && !lines[i].includes("CHEF")) {
                menu[count] = lines[i].toLowerCase().trim();
                count = count+1;
            }
        }
        var ingredients = [];
        for (var i = 0; i < menu.length; i++) { 
          console.log(i + ". " + menu[i]);
          console.log("QUERY: " + menu[i].split(" ")[0]);
          var ing = ["bananas", "fish"];
          // var ing = getIngredients(menu[i].split(" ")[0]);
          var l = ingredients.length;
          for (var j = 0; j < ing.length; j++) {
            ingredients[l+j] = ing[j];
          }
        }
        display = ingredients[0];
        for (var i = 1; i < ingredients.length; i++) {
          display += ", " + ingredients[i];
        }
        container = document.querySelector(".form-group.textarea");
        container.style.display="block";
        display = "Quinoa, brussel sprouts, lettuce, asparagus, squash, garlic, white wine, tomatoes, basil, manila clams, salad greens, tomatoes, beets, blue cheese, prosciutto, mushrooms, tomatoes, cheese, chicken, potatoes, squid, lemon, garlic aioli, angus beef, lettuce, sliced tomato, onions, pickles, pineapple, tomatoes, garlic, olive oil, pepper, short rib, ground beef, tomatoes, mashed potato, onions, artichoke, mahi mahi, olive oil, white wine, onion, garlic, pine nuts, capers, basil, olives";
        disp = document.getElementById("disp");
        disp.style.display = "block";
        disp.innerText = display;
        await worker.terminate();
      })()
  };