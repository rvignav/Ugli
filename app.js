const storeList = document.querySelector('#store-list');
const form = document.querySelector('#add-cafe-form');

// create element and render Restaurants
function renderStore(doc){
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  storeList.appendChild(li);

  console.log(doc.data().name);
  console.log(doc.data().city);
  console.log(doc.data().ingredients);

  // deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id')
    db.collection('Restaurants').doc(id).delete();
  })
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
  form.name.value = '';
  form.city.value = '';
})
