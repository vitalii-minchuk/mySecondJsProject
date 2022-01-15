
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
    ID: createID(),
  };
  return item;
}
let ID = 1;
function createID() {
  return ID++;
}

const allThePhones = [];

let theNumberOfPhones = 200;

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
  elem3Price.innerHTML = obj.price;

  let elem3Delivery = document.createElement('div');
  elem3Delivery.setAttribute('class', 'item__spec-offer');
  let elem3DeliveryImg =  document.createElement('img');
  elem3DeliveryImg.setAttribute('class', 'item__description-img');
  elem3DeliveryImg.setAttribute('src', './img/delivery-shipping-truck-logistic.png');
  elem3Delivery.appendChild(elem3DeliveryImg);

  let elem3Cart = document.createElement('div');
  elem3Cart.setAttribute('class', 'item__cart');

  elem3Cart.setAttribute('id', `${obj.ID}`);

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

    addProduct();
    
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

let productsInCart = [];

const parentElement = document.querySelector('.cart__popup-content');
const cartSumPrice = document.getElementById('sum-prices');

addProduct();

function addProduct() {
  const products = document.querySelectorAll('.item');
products.forEach(product => {
  product.addEventListener('click', () => {
    const productName = product.querySelector('.item__title').innerHTML;
    const productPrice = product.querySelector('.item__price').innerHTML;
    const productImg = product.querySelector('.phone-photo').src;
    const productId = product.querySelector('.item__cart').id;

    let productToCart = {
      name: productName,
      id: productId,
      img: productImg,
      price: +productPrice,
      count: 1,
      basePrice: +productPrice,
    }

    updateProductsInCart(productToCart);
    updateShoppingCartHTML();
  })
})

}

function updateProductsInCart(product) {
  for (i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].id == product.id) {

      productsInCart[i].count++;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
    }
  }
  productsInCart.push(product);
}

function updateShoppingCartHTML() {
  if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<div class="cart__popup-goods">
					<div class="cart__popup-goods-photo" >
            <img class="cart__popup-goods-img" src="${product.img}" alt="phone">
          </div>
					<div class="cart__popup-goods-description">
						<div class="cart__popup-goods-description-title">${product.name}</div>
						<div class="cart__popup-goods-description-price">${product.price}</div>
						<div class="cart__popup-goods-description-btns">
							<button class="cart__popup-goods-description-btn-plus" data-id=${product.id}>-</button>
							<span class="cart__popup-goods-description-count">${product.count}</span>
							<button class="cart__popup-goods-description-btn-minus" data-id=${product.id}>+</button>
						</div>
					</div>
				</div>`
		});

		parentElement.innerHTML = result.join('');
    cartSumPrice.innerHTML = `${sumPrice()}`;
    console.log('way')

	} else {
    parentElement.innerHTML = '<div class="cart__popup-content-empty">Your cart is empty</div>';
    cartSumPrice.innerHTML = '';
  }
}

function sumPrice() {
  let sum = 0;
  productsInCart.forEach(product => {
    sum += +product.price;
  })
  return sum;
}

parentElement.addEventListener('click', (e) => {

	const plus = e.target.classList.contains('cart__popup-goods-description-btn-plus');
	const minus = e.target.classList.contains('cart__popup-goods-description-btn-minus');

  if (plus) {
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i].id == e.target.dataset.id) {
        if (plus) {
        	productsInCart[i].count--;
        }
        	productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
          console.log(productsInCart[i].price);
      
        }
        if (productsInCart[i].count <= 0) {
          productsInCart.splice(i, 1);
          
        }

        updateShoppingCartHTML()

      }
  } else if (!minus){
    console.log('3')
  } else {
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i].id == e.target.dataset.id) {
        productsInCart[i].count++;
        productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
        console.log(productsInCart[i].price);
      }
    }
  }

  updateShoppingCartHTML()

})

updateShoppingCartHTML() 


// console.log(productToCart)
// console.log(products)

//-----------------------------------------------------

// ======?????????????????????fshaj djfgkasks===============
