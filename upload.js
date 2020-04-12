var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
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
        while (text.indexOf("CHEF’S TASTING MENU\n") != -1) {
            text = text.replace("CHEF’S TASTING MENU\n", "");
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
            if (lines[i].replace(/\s/g, "").length != 0) {
                menu[count] = lines[i].toLowerCase().trim();
                count = count+1;
            }
        }
        var ingredients = [];
        for (var i = 0; i < menu.length; i++) { 
          console.log(i + ". " + menu[i]);
          var ing = getIngredients(menu[i].split(" ")[0]);
          var l = ingredients.length;
          for (var j = 0; j < ing.length; j++) {
            ingredients[l+j] = ing[j];
          }
        }
        var display = ingredients[0];
        for (var i = 1; i < ingredients.length; i++) {
          display += ", " + ingredients[i];
        }
        document.getElementById("disp").innerText = display;
        await worker.terminate();
      })()
  };