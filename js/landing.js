// blob buttons
let blobButtons = document.getElementsByClassName("blob-btn");
for (let i = 0; i < blobButtons.length; i++) {
  let innerContainer = document.createElement("span");
  innerContainer.className = "blob-btn__inner";
  let blobs = document.createElement("span");
  blobs.className = "blob-btn__blobs";
  let blob = document.createElement("span");
  blob.className = "blob-btn__blob";
  for (let j = 0; j < 4; j++) blobs.appendChild(blob.cloneNode());
  innerContainer.appendChild(blobs);
  blobButtons[i].appendChild(innerContainer);
}
