
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
                menu[count] = lines[i];
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
        for (var i = 0; i < menu.length; i++) {
          console.log(i + ". " + menu[i]);
        }
        db.collection('Restaurants').add({
          name: name,
          address: address,
          // email: email,
          city: city,
          phone: phone,
          ingredients: menu
        }).then(function() {
          console.log("DONE");
          location.reload();
        });
      });
  };
  
  $('#formButton').click(async (e) => {
    e.preventDefault();
    console.log('IN SUBMIT');
    await submit('#input');
});