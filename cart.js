let cartTotal = document.querySelector(".head");
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
let conti = document.querySelector(".img-container");
let itemBasket = JSON.parse(localStorage.getItem("Cart-list")) || [];
let itemCalculation = () => {
    let str = document.querySelector(".cart p");
    let itemFilter = itemBasket.map(x => x.item).reduce((a, b) => a + b, 0);
    str.innerHTML = itemFilter;
};
itemCalculation();
let genProd = () => {
    if(itemBasket.length !== 0){
        return(conti.innerHTML = itemBasket.map((x) => {
            // console.log(x);
            let {id,item} = x;
            let mySearch = shopItem.find((x) => x.id === id) || [];
            return `
            <div class="boxes">
                <div class="cart-box">
                    <img src="${mySearch.img}" alt="cart">
                    <p>${mySearch.name}</p>
                </div>
                <div class="cart-det">
                <i onclick="myRem(${id})" class="fa-regular fa-circle-xmark"></i>
                    <p><strong>$</strong>${mySearch.price}</p>
                    <i onclick="myDec(${id})" class="fa-solid fa-minus"></i><strong id=${id}>${item}</strong><i onclick="myInc(${id})" class="fa-solid fa-plus"></i>
                    <h1>$${item*mySearch.price}</h1>
                </div>
               </div>
            `;
        }).join(""));
    
    }else{
        conti.innerHTML = `
        <div class="flex">
        <h1>Cart is Empty</h1>
        <a href="./index.html"><button>Go Back to Home Page</button></a>
    </div>`;
    }
}
genProd();
let myInc = (id) => {
    let selectItem = id;
    let mySearch = itemBasket.find((x) => x.id === selectItem.id);
    if (mySearch === undefined) {
        itemBasket.push({
            id: selectItem.id,
            item: 1,
        });
        // console.log(itemBasket);
    }
    else {
        mySearch.item += 1;
    }
    itemUpdate(selectItem.id);
    genProd();
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
     genProd();
    localStorage.setItem("Cart-list",JSON.stringify(itemBasket));
};
let itemUpdate = (id) => {
    let mySearch = itemBasket.find((x) => x.id === id)
    let d = document.getElementById(id)
    d.style.padding = " 0 5px";
    d.innerText = mySearch.item;
    itemCalculation();
    totalAmount();
};
let myRem = (id) => {
    let remov = id;
    itemBasket = itemBasket.filter((x) => x.id !== remov.id);
    genProd();
    totalAmount();
    itemCalculation();
    localStorage.setItem("Cart-list",JSON.stringify(itemBasket));
};
let totalAmount = () => {
    if(itemBasket.length !== 0){
        let myAmount = itemBasket.map((x) => {
            let {id,item} = x;
            let mySearch = shopItem.find((x) => x.id === id) || [];
            return item*mySearch.price  
        }).reduce((a,b) => a+b,0);
        cartTotal.innerHTML = `
        <h1 class="t">Total Price: <strong>${myAmount}</strong></h1>
    <button onclick="clearCart()">Clear</button>
    `;

    }else return;
}
totalAmount();
let clearCart = () => {
    itemBasket = [];
    genProd();
    itemCalculation();
cartTotal.innerHTML = "";
    localStorage.setItem("Cart-list",JSON.stringify(itemBasket));
}