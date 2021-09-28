// This is 'index.js' File of Fun2Learn

// Accordian Script
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

    accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", event => {

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains("active")) {
        accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    }
    else {
        accordionItemBody.style.maxHeight = 0;
        }
    });
});

// Clicking on Open buttons of Game-1, Game-2, Game-3
const open1 = document.getElementById('open1');
const open2 = document.getElementById('open2');
const open3 = document.getElementById('open3');

// Clicking on Close buttons of Game-1, Game-2, Game-3
const close1 = document.getElementById('quit');
const close2 = document.getElementById('close2');
const close3 = document.querySelector('.close');

//  Opening of Game-1, Game-2, Game-3 Modals 
const modal_container1 = document.getElementById('modal_container1');
const modal_container2 = document.getElementById('modal_container2');
const modal_container3 = document.getElementById('modal_container3');

// Opening of Game-1, Game-2, Game-3 Modal Contents
open1.addEventListener("click", () => {
    modal_container1.classList.add("show");
})

open2.addEventListener("click", () => {
    modal_container2.classList.add("show");
})

open3.addEventListener("click", () => {
    modal_container3.classList.add("show");
})

// Closing of Game-1, Game-2, Game-3 Modal Contents
close1.addEventListener("click", () => {
    modal_container1.classList.remove("show");
})

close3.addEventListener("click", () => {
    modal_container3.classList.remove("show");
})

