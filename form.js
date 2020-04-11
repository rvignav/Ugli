const addToFirebase = async (ref, obj) => {
    
  };
  
  const submit = async (section) => {
    const name = $(`${section} #name`).val();
    const address = $(`${section} #address`).val();
    const city = $(`${section} #city`).val();
    const state = $(`${section} #state`).val();
    const email = $(`${section} #email`).val();
    const phone = $(`${section} #phone`).val();
    var image = document.getElementById("output");
    var menu = "";
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
        while (text.indexOf("0") != -1) {
            text = text.replace("0", "");
        }
        while (text.indexOf("1") != -1) {
            text = text.replace("1", "");
        }
        while (text.indexOf("2") != -1) {
            text = text.replace("2", "");
        }
        while (text.indexOf("3") != -1) {
            text = text.replace("3", "");
        }
        while (text.indexOf("4") != -1) {
            text = text.replace("4", "");
        }
        while (text.indexOf("5") != -1) {
            text = text.replace("5", "");
        }
        while (text.indexOf("6") != -1) {
            text = text.replace("6", "");
        }
        while (text.indexOf("7") != -1) {
            text = text.replace("7", "");
        }
        while (text.indexOf("8") != -1) {
            text = text.replace("8", "");
        }
        while (text.indexOf("9") != -1) {
            text = text.replace("9", "");
        }
        console.log(text);
        document.getElementById("text").innerText = text;
        menu = text;
        await worker.terminate();
      })();
  
    // await addToFirebase(refMarkers, { name, address, email, subject, message });
  };
  
  $('#formButton').click(async (e) => {
    e.preventDefault();
    console.log('IN SUBMIT');
    await submit('#input');
    setTimeout(function(){ location.reload() }, 30000);
});