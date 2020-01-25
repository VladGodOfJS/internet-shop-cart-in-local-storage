

const parts = [
    {
        img: 'block3/p1.png',
        name: 'music',
        cost: 300,
    },

    {
        img: 'block3/p2.png',
        name: 'headlights',
        cost: 900,

    },
    {
        img: 'block3/p3.png',
        name: 'seats',
        cost: 800,

    },
    {
        img: 'block3/p4.png',
        name: 'subbufers',
        cost: 200,

    },
    {
        img: 'block3/p5.png',
        name: 'wheels',
        cost: 900,

    },
]

let cart = {};

const drawParts = () => {
    //рисуем товары

    let out = '';
    for (let key in parts) {
        out += `<div class="parts">`
        out += `<img class="parts__img" src="${parts[key].img}"> <br>`;
        out += `<h3 class=parts__title> ${parts[key].name} </h3> <br>`;
        out += `<p class = parts__cost>${parts[key].cost}$</p> <br>`;
        out += `<button class="parts__btn" data-id="${key}">Buy</button>`
        out += `</div>`
    }

    document.querySelector('.wrap-product').innerHTML = out;
}

drawParts();

const addToCard = () => {
    // добавляем в лс

    document.querySelectorAll('.parts__btn').forEach(function (el) {
        el.onclick = function () {
            let index = +this.dataset.id;

            if (cart[index] != undefined) {
                cart[index]++
            } else {
                cart[index] = 1
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            showCart();
        }
    })

}

addToCard();

const checkCart = () => {
    // проверяем наличие в лс

    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
}

checkCart();

const showCart = () => {
    // выводим мини корзину

    let div = document.createElement('div');
    div.classList.add('wrap-cart');
    let wrap = document.querySelector('.wrap-product')
    wrap.appendChild(div);
    div.style.maxWidth = 330 + 'px';
    div.style.height = 'auto';
    div.style.background = '#f5f5f5 ';
    div.style.borderRadius = 10 + 'px';
    div.style.position = "absolute";
    div.style.left = 30 + 'px';
    div.style.top = 1100 + 'px';

    if (cart == null) {
        let out = 'корзина пуста';
        document.querySelector('.wrap-cart').innerHTML = out;
    } else {
        let out = '';

        for (let key in cart) {

            out += `<div class="mini-cart">`
            out += `<img src="${parts[key].img}" class="mini-cart__img" alt="parts">`
            out += `<h3 class="mini-cart__title">${parts[key].name}</h3>`
            out += `<div class="minus" data-minus="${key}"></div>`
            out += `<span class="mini-cart__amount">${cart[key]}</span>`
            out += `<div class="plus" data-plus="${key}"></div>`
            out += '<div class="mini-cart__sum">' + cart[key] * parts[key].cost + '$' + '</div>'
            out += `<div class="mini-cart__delete" data-delete="${key}"><img src="https://img.icons8.com/ios/24/000000/delete-trash.png"></div>`
            out += `</div>`

        }
        document.querySelector('.wrap-cart').innerHTML = out;

        document.querySelectorAll('.plus').forEach(function (el) {
            el.onclick = plus;
        })

        document.querySelectorAll('.minus').forEach(function (el) {
            el.onclick = minus;
        })

        document.querySelectorAll('.mini-cart__delete').forEach(function (el) {
            el.onclick = deleteCart;
        })
    }
}

function plus() {
    // плюсуем товар

    let index = this.dataset.plus;
    cart[index]++;
    showCart();
    refreshLs();
}

function minus() {
    // минусуем товар 

    let index = this.dataset.minus;
    cart[index] = cart[index]--;
    if (cart[index] > 1) {
        cart[index]--

    } else {
        delete cart[index];
    }

    showCart();
    refreshLs();
}

function deleteCart() {
    let index = this.dataset.delete;
    delete cart[index];
    showCart();
    refreshLs();

}

const refreshLs = () => {
    // обновляем лс 
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelector('.burger-menu').onclick = function () {
    // вызов меню
    // отменяем скролл
    this.classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
    document.querySelector('body').classList.toggle('lock');

}

let left = 0;

const leftSlider = () => {
    console.log('slide');
    let div = document.querySelector('.parts');
    left = left - 190;

    if (left < -380) {
        left = 0;
    }

    if (window.innerWidth < 768) {
        left = 0;
    }

    div.style.marginLeft = left + 'px';
}

document.querySelector('.product__left-btn').onclick = leftSlider;



window.onresize = function () {

}


// var sliderInterval = setInterval(() => {
//     leftSlider()

// }, 5000);

// const resize = () => {
//     clearInterval(window.sliderInterval);
//     console.log('clear')
//     if (window.innerWidth > 768) {
//         console.log('create')

//         window.sliderInterval = setInterval(() => {
//             leftSlider()

//         }, 5000);
//     }
// }

// window.onresize = resize;
