
//-------------------------------random arrey-----------------------------------
function makeItems() {

    const makes = ['Apple', 'Huawei', 'ASUS', 'Sony', 'Alcatel', 'Motorola', 'Nokia', 'Samsung', 'ZTE', 'Xiaomi'];
    const price = getRandomPrice(1000, 30000);;
    const freeDelivery =[false, true];

    let randomMakes = Math.floor(Math.random() * makes.length);
    let randomDelivery = Math.floor( Math.random() * 2);

    function getRandomPrice(min, max) {

        let num = Math.random() * (max - min) + min;

            beautifullNum = Math.trunc(num / 100) * 100;
    return beautifullNum;
    }

    let item = {
        make: makes[randomMakes],
        price,
        'free delivery': freeDelivery[randomDelivery],
    };
    return item;
}
const allThePhones = [];

let theNumberOfPhones = 50;

while (theNumberOfPhones) {
  allThePhones.push(makeItems());
  theNumberOfPhones--;
}
//------------------------------pagination------------------------------------

const pages = document.getElementById('page-btns');
const list = document.getElementById('wrapper');

let currentPage = 1;
let numberOfItemsOnThePage = 5;

function ShowList(items, wrapper, itemsPerPage, page) {
  wrapper.innerHTML = '';
  page--;

  let start = itemsPerPage * page;
  let end = start + itemsPerPage
  let slicedItems = items.slice(start, end);
  
  for (i = 0; i < slicedItems.length; i++) {

    let elem = document.createElement('div');
    elem.setAttribute('class', 'item');

    let elem2 = document.createElement('div');
    elem2.setAttribute('class', 'item__title');
    elem2.innerHTML = 'hello';

    let elem1 = document.createElement('div');
    elem1.setAttribute('class', 'item__img');

    let elem1Img = document.createElement('img');
    elem1Img.setAttribute('class', 'phone-photo');
    elem1Img.setAttribute('src', './img/smartphone-iphone-pngrepo-com.png');

    elem1.appendChild(elem1Img);
    elem.appendChild(elem1);
    elem.appendChild(elem2);

    console.log(elem)
    list.appendChild(elem);
    console.log(list)

  }
}

// function createNewItem(text, )

ShowList(allThePhones, list, numberOfItemsOnThePage, currentPage);









