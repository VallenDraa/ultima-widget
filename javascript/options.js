// options
// dark/light mode
let lightMode = false;
let transparent = false;
cards = document.querySelectorAll(".card")

document.querySelector(".toggle-display").addEventListener("click",function(){
    document.querySelectorAll(".inner-circle")[0].classList.toggle("move-inner-circle")
    document.querySelectorAll(".toggle-btn").forEach(item => {
        item.classList.toggle("turn-display-mode-btn")
    })
    document.querySelectorAll(".toggle-btn > .fas").forEach(item => {
        item.classList.toggle("text-white")
    })
    turnLightMode()
    lightMode = !lightMode
    console.log(lightMode, "lm")
    displayTransparentConfig()
})
// text transparent
document.querySelector(".toggle-transparent").addEventListener("click",function() {
    document.querySelectorAll(".inner-circle")[1].classList.toggle("move-inner-circle")
    textTransparent()
    transparent = !transparent
    console.log(transparent, "tr")
})

// blinding mode function

function turnLightMode(){
    cards.forEach(item => {
        item.classList.toggle("light-mode-outer")
    })
    document.querySelectorAll(".card-inner").forEach(item => {
        item.classList.toggle("light-mode-inner")
    })
    document.querySelectorAll(".fa-times").forEach(item =>{
        item.classList.toggle("light-mode-back-btn")
    })
    document.querySelectorAll(".input-text").forEach(item => {
        item.classList.toggle("input-text-light-mode")
    })
    document.body.classList.toggle("scroll-bar-light-mode")

    // text transparency
}

// turn text to transparent
function textTransparent(){
    cards.forEach(item => {
        if(lightMode){
            item.classList.toggle("transparent-dark")
            document.body.classList.toggle("lighten-bg")
        }
        else{
            item.classList.toggle("transparent-light")
        }
        item.classList.toggle("tp-on")

    })
}

function displayTransparentConfig(){
   cards.forEach(item => {
       if(lightMode && item.classList.contains("tp-on")){
            item.classList.replace("transparent-light", "transparent-dark")
            document.body.classList.add("lighten-bg")
       }
       else if(!lightMode && item.classList.contains("tp-on")){
            item.classList.replace("transparent-dark","transparent-light")
            document.body.classList.remove("lighten-bg")
       }
   })
}