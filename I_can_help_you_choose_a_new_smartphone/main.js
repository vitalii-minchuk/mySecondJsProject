
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
k = 0;
while (k < theNumberOfPhones) {
  allThePhones.push(makeItems());
  k++;
}

console.log(allThePhones);

//------------------------------pagination------------------------------------






