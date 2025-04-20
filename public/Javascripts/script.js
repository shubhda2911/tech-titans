let formBtn = document.querySelector('#Obtn');
let closeBtn = document.querySelector('#CBtn');
let full = document.querySelector('#full');
let FBtn = document.querySelector('.hello')


formBtn.addEventListener("click",() => {
    full.style.right = "0";
})

FBtn.addEventListener("click",() => {
    full.style.right = "0";
})

closeBtn.addEventListener("click",() => {
    full.style.right = "-40%";
})

