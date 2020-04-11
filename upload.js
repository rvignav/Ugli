// import Tesseract from 'tesseract.js';

var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
    // Tesseract.recognize(
    // document.getElementById("image"),
    // 'eng',
    // { logger: m => console.log(m) }
    // ).then(({ data: { text } }) => {
    // console.log(text);
    // document.getElementById("text").innerHTML = text;
    // })

    
  };



//   var defaultClient = cloudmersiveOcrApiClient.ApiClient.instance;
//     // Configure API key authorization: Apikey
//     var Apikey = defaultClient.authentications['Apikey'];
//     Apikey.apiKey = "4773da37-4035-4c6c-ac44-b515b09ea043";
    
//     // var fs  = require('fs');
    
//     var api = new cloudmersiveOcrApiClient.ImageOcrApi()
     
//     // var imageFile = fs.readFileSync("../image.png"); // {File} Image file to perform OCR on.  Common file formats such as PNG, JPEG are supported.
     
//     var callback = function(error, data, response) {
//       if (error) {
//         console.error(error);
//       } else {
//         console.log('API called successfully. Returned data: ' + data);
//         document.getElementById("text").innerHTML = data;
//       }
//     };
//     api.imageOcrPost(Buffer.from(imgFile.buffer), callback);