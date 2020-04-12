const storeList = document.querySelector('#store-list');
const form = document.querySelector('#add-cafe-form');

// create element and render Restaurants
function renderStore(doc){
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  li.appendChild(name);
  li.appendChild(city);

  storeList.appendChild(li);

  console.log(doc.data().name);
  console.log(doc.data().city);
  console.log(doc.data().ingredients);
}

// getting data
db.collection('Restaurants').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderStore(doc);
  })
});

// saving  data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('Restaurants').add({
    name: form.name.value,
    city: form.city.value
  });
})
