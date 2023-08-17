document.querySelector(".summary > h2").innerText=document.cookie;
let price = document.querySelector("#price").innerText = Math.floor(Math.random()*1000);

document.querySelector("#submit").addEventListener('click',()=>{
    let n = document.querySelector("#noOfTickets").value;

    document.querySelector("#total").innerText= `${(price*n)*1.18}`;

})