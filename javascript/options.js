// options
// dark/light mode event listeners
let lightMode = false;
let transparent = false;
const cards = document.querySelectorAll(".card")

document.querySelector(".toggle-display").addEventListener("click",function(){
    document.querySelectorAll(".inner-circle")[0].classList.toggle("move-inner-circle")
    document.querySelectorAll(".toggle-btn").forEach(item => {
        item.classList.toggle("toggle-btn-change-color")
    })
    document.querySelectorAll(".toggle-btn > .fas").forEach(item => {
        item.classList.toggle("icon-text-black")
    })
    document.querySelectorAll(".inner-circle").forEach(item => {
        item.classList.toggle("bg-dimgray")
    })
    document.querySelectorAll(".toggle-transparent>p").forEach(item => {
        item.classList.toggle("icon-text-black")
    })
    document.querySelectorAll(".slider").forEach(item => {
        item.classList.toggle("bg-lightergray")
    })
    document.querySelectorAll(".slider>p").forEach(item => {
        item.classList.toggle("icon-text-black")
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


// slider eventlistener
const rangeSliders = document.querySelectorAll(".opt-range")
let slide1Value = 0;
let slide2value= 0; 
// outer spacing slider
rangeSliders[0].addEventListener("change",function() {
    const content= document.querySelector(".content")
    // const style = getComputedStyle(content)
    // let contentWidth = (parseInt(style.width)/parseInt(screen.width)) *100
    if(this.value > slide1Value) {
        console.log("increase")
        content.style.width = `${70-parseInt(this.value)}%`
    } else {
        console.log("decrease")
        content.style.width = `${70+parseInt(this.value)}%`
    }
    slide1Value = parseInt(this.value);
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