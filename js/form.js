import {sendMessage} from './send.js';

const contact = "+15107371236";

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


const submit = async (section) => {
    const name = $(`${section} #name`).val();
    const address = $(`${section} #address`).val();
    const city = $(`${section} #city`).val();
    // const email = $(`${section} #email`).val();
    const phone = $(`${section} #phone`).val();
    var image = document.getElementById("output");
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
        while (text.indexOf("BREAKFAST") != -1) {
            text = text.replace("BREAKFAST", "");
        }
        while (text.indexOf("LUNCH") != -1) {
            text = text.replace("LUNCH", "");
        }
        while (text.indexOf("DINNER") != -1) {
            text = text.replace("DINNER", "");
        }
        text = text.replace(/[0-9]/g, '');
        text = text.replace(/^Lo(.*)$/mg, "");
        text = text.replace(/\n\s*\n/g, '\n');
        lines = text.split("\n");
        console.log("Length: " + lines.length)
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].replace(/\s/g, "").length != 0) {
                menu[count] = lines[i].toLowerCase().trim();
                count = count+1;
            }
        }
        await worker.terminate();
      })().then(function() {
        console.log(name);
        console.log(address);
        // console.log(email);
        console.log(city);
        console.log(phone);
        var ingredients = [];
        for (var i = 0; i < menu.length; i++) { 
          console.log(i + ". " + menu[i]);
          var ing = getIngredients(menu[i]);
          var l = ingredients.length;
          for (var j = 0; j < ing.length; j++) {
            ingredients[l+j] = ing[j];
          }
        }
        var dict = {};
        for (var i = 0; i < ingredients.length; i++) {
          dict[ingredients[i]] = 0;
        }
        db.collection('Restaurants').add({
          name: name,
          address: address,
          // email: email,
          city: city,
          phone: phone,
          ingredients: dict
        }).then(function() {
          console.log("DONE");
          window.location.href="../home.html"
        });
      });
  };

  const submit2 = async (section) => {
    const name = $(`${section} #name`).val();
    const address = $(`${section} #address`).val();
    const phone = $(`${section} #phone`).val();
    const i1name = $(`${section} #i1name`).val();
    const i1quantity = $(`${section} #i1quantity`).val();
    const i1price = $(`${section} #i1price`).val();

    const i2name = $(`${section} #i2name`).val();
    const i2quantity = $(`${section} #i2quantity`).val();
    const i2price = $(`${section} #i2price`).val();

    const i3name = $(`${section} #i3name`).val();
    const i3quantity = $(`${section} #i3quantity`).val();
    const i3price = $(`${section} #i3price`).val();
    
    const text = name + ' is a nearby farmer located at ' + address + ' and is willing to offer you the following foods:\n\n' + i1quantity + ' pounds of ' + i1name + ' at a price of $' + i1price + ' per pound\n\n' + i2quantity + ' pounds of ' + i2name + ' at a price of $' + i2price + ' per pound\n\n' + i3quantity + ' pounds of ' + i3name + ' at a price of $' + i3price + ' per pound\n\n' + 'Please contact ' + name + ' at ' + phone + ' to further discuss this offer and make a deal. Thanks!';
    console.log("here: " + contact);
    sendMessage(contact, text);
  };
  
  $('#formButton').click(async (e) => {
    e.preventDefault();
    console.log('IN SUBMIT');
    await submit('#input');
});

$('#formButton2').click(async (e) => {
  e.preventDefault();
  console.log('IN SUBMIT');
  await submit2('#input2');
});
