
function makeItems() {

    const makes = ['Apple', 'Huawei', 'Motorola', 'Nokia', 'Samsung', 'ZTE', 'Xiaomi'];
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
let iter = 5;
i = 0;
while (i < iter) {
    makeItems();
    console.log(makeItems());
    i++;
}
