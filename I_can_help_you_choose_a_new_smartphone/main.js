
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

let theNumberOfPhones = 100;

while (theNumberOfPhones) {
  allThePhones.push(makeItems());
  theNumberOfPhones--;
}
//------------------------------pagination------------------------------------

const pages = document.getElementById('page-btns');
const list = document.getElementById('wrapper');

let currentPage = 1;
let numberOfItemsOnThePage = 10;

function ShowList(items, wrapper, itemsPerPage, page) {
  wrapper.innerHTML = '';
  page--;

  let start = itemsPerPage * page;
  let end = start + itemsPerPage
  let slicedItems = items.slice(start, end);
  
  for (i = 0; i < slicedItems.length; i++) {

    let obj = slicedItems[i];

    createNewItem(obj);

  }
}

function createNewItem(obj) {

  let elem = document.createElement('div');
  elem.setAttribute('class', 'item');

  let elem2 = document.createElement('div');
  elem2.setAttribute('class', 'item__title');
    
  elem2.innerHTML = obj.make;

  let elem1 = document.createElement('div');
  elem1.setAttribute('class', 'item__img');
  let elem1Img = document.createElement('img');
  elem1Img.setAttribute('class', 'phone-photo');
  elem1Img.setAttribute('src', './img/smartphone-iphone-pngrepo-com.png');
  elem1.appendChild(elem1Img);

  let elem3 = document.createElement('div');
  elem3.setAttribute('class', 'item__description');
  let elem3Price = document.createElement('div');
  elem3Price.setAttribute('class', 'item__price');
   elem3.innerHTML = obj.price;

  let elem3Delivery = document.createElement('div');
  elem3Delivery.setAttribute('class', 'item__spec-offer');
  let elem3DeliveryImg =  document.createElement('img');
  elem3DeliveryImg.setAttribute('class', 'item__description-img');
  elem3DeliveryImg.setAttribute('src', './img/delivery-shipping-truck-logistic.png');
  elem3Delivery.appendChild(elem3DeliveryImg);

  let elem3Cart = document.createElement('div');
  elem3Cart.setAttribute('class', 'item__cart');
  let elem3CartImg =  document.createElement('img');
  elem3CartImg.setAttribute('class', 'item__description-img');
  elem3CartImg.setAttribute('src', './img/cart.png');
  elem3Cart.appendChild(elem3CartImg);
  elem3.appendChild(elem3Price);
    if (obj['free delivery']) {
      elem3.appendChild(elem3Delivery)
    }
  elem3.appendChild(elem3Cart);

  elem.appendChild(elem1);
  elem.appendChild(elem2);
  elem.appendChild(elem3);

  list.appendChild(elem);
}

function ShowPages(items, wrapper, itemsPerPage) {
  wrapper.innerHTML = '';
  let pageCount = Math.ceil(items.length / itemsPerPage);
  for (i = 1; i < pageCount + 1; i++) {
    let btn = createNewPage (i);
    wrapper.appendChild(btn);
  }
}

function createNewPage (page) {
  let pageBtn = document.createElement('div');
  pageBtn.setAttribute('class', 'content__pages-btn');
  pageBtn.innerText = page;
  if (currentPage == page) {
    pageBtn.classList.add('active');
  }
  pageBtn.addEventListener('click', () => {
    console.log('hello')
    currentPage = page;
    ShowList(allThePhones, list, numberOfItemsOnThePage, currentPage);
    let currentBtn = document.querySelector('.content__pages-btn.active');
    currentBtn.classList.remove('active');
    pageBtn.classList.add('active');
  })
  return pageBtn;
}

ShowList(allThePhones, list, numberOfItemsOnThePage, currentPage);
ShowPages(allThePhones, pages, numberOfItemsOnThePage);

//------------------------------popup+cart------------------------

const openShopCart = document.querySelector('.cart__open');
const popUp = document.querySelector('.cart__popup');
const closeShopCart = document.querySelector('.cart__popup-close');
const overlay = document.querySelector('.cart__popup-overlay');
const hideScrolling = document.querySelector('body')

openShopCart.addEventListener('click', () => {
  popUp.classList.toggle('hide');
  hideScrolling.classList.toggle('scrolling');
})

closeShopCart.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

function closeCart() {
  popUp.classList.toggle('hide');
  hideScrolling.classList.toggle('scrolling');
}

