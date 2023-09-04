let cont = document.querySelector(".img-container");
let shopItem = [
    {
        id: "itemone",
        name: "T-Shirt",
        price: 45,
        img: "./h1 (1).jpg",
    },
    {
        id: "itemtwo",
        name: "T-Shirt",
        price: 45,
        img: "./h1 (2).jpg",
    },
    {
        id: "itemthree",
        name: "T-Shirt",
        price: 45,
        img: "./h1 (3).jpg",
    },
    {
        id: "itemfour",
        name: "T-Shirt",
        price: 45,
        img: "./h1 (4).jpg",
    },
    {
        id: "itemfive",
        name: "T-Shirt",
        price: 45,
        img: "./h1 (5).jpg",
    },
    {
        id: "itemsix",
        name: "T-Shirt",
        price: 45,
        img: "./h1 (6).jpg",
    },
    {
        id: "itemseven",
        name: "T-Shirt",
        price: 45,
        img: "./h1 (8).jpg",
    }
];
let itemBasket = JSON.parse(localStorage.getItem("Cart-list")) || [];
let generateProduct = () => {
    return (
        cont.innerHTML = shopItem.map((element) => {
            let { id, name, price, img } = element;
            let localSearch = itemBasket.find((x) => x.id === id);
            return ` <div id=${id} class="box">
            <img src="${img}" alt="product">
            <p class="name">${name}</p>
            <p><strong>&pound;</strong>${price}</p>
            <i onclick="myDec(${id})" class="fa-solid fa-minus"></i><strong > ${localSearch === undefined ? 0 : localSearch.item} </strong><i onclick="myInc(${id})" class="fa-solid fa-plus"></i>
        </div>`;
        }).join(""));
};
generateProduct();

let myInc = (id) => {
    let selectItem = id;
    let mySearch = itemBasket.find((x) => x.id === selectItem.id);
    if (mySearch === undefined) {
        itemBasket.push({
            id: selectItem.id,
            item: 1,
        });
    }
    else {
        mySearch.item += 1;
    }
    itemUpdate(selectItem.id);
    localStorage.setItem("Cart-list",JSON.stringify(itemBasket));
};
let myDec = (id) => {
    let selectItem = id;
    let mySearch = itemBasket.find((x) => x.id === selectItem.id);
    if (mySearch === 0) return;
    else if(mySearch.item === 0) return;
    else {
        mySearch.item -= 1;
    }
    itemUpdate(selectItem.id)
     itemBasket = itemBasket.filter((x) => x.item !== 0);
    localStorage.setItem("Cart-list",JSON.stringify(itemBasket));
};
let itemUpdate = (id) => {
    let mySearch = itemBasket.find((x) => x.id === id)
    let d = document.getElementById(id).firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    d.style.padding = " 0 5px";
    d.innerText = mySearch.item;
    itemCalculation();
    
};
let itemCalculation = () => {
    let str = document.querySelector(".cart p");
    let itemFilter = itemBasket.map(x => x.item).reduce((a, b) => a + b, 0);
    str.innerHTML = itemFilter;
};
itemCalculation();

