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
    document.querySelectorAll(".-webkit-scrollbar-dark").forEach(item => {
        item.classList.toggle("-webkit-scrollbar-light")
    })
    document.querySelector(".weather-icon").classList.toggle("add-bg-weather-icon")
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
const content= document.querySelector(".content")

// outer spacing slider
rangeSliders[0].addEventListener("input",function() {
    switch (parseInt(this.value)) {
        case 1:
            content.style.width = `70%`
            break;
        case 2:
            content.style.width = `65%`
            break;
        case 3:
            content.style.width = `60%`
            break;
        case 4:
            content.style.width = `55%`
            break;
        case 5:
            content.style.width = `50%`
            break;               
        default:
            break;
    }
})
rangeSliders[1].addEventListener("input",function() {
    switch (parseInt(this.value)) {
        case 1:
            content.style.gap = `5rem`
            break;
        case 2:
            content.style.gap = `5.3rem`
            break;
        case 3:
            content.style.gap = `5.6rem`
            break;
        case 4:
            content.style.gap = `5.9rem`
            break;
        case 5:
            content.style.gap = `6.2rem`
            break;               
        default:
            break;
    }
})

// font changes input eventlistener
document.querySelector(".input-font-type").addEventListener("input",function(){
    this.value != "" ? changeFont(this.value) : changeFont("'Open Sans', sans-serif")
    console.log(this.value)
})
// wait until option loads and immediately adds datalist
window.addEventListener("load",function(){
    const datalist = document.querySelector("#fontList")
    const fonts = ["Open Sans","Jetbrains Mono","Roboto","Lato","Monserrat","Poppins","Oswald","Noto Serif","Oxygen","Ubuntu","Serif","Sans Serif","Monospace","Fantasy","Cursive","Verdana","Impact","Georgia","Cambria","Trebuchet MS","Times New Roman","Segoe UI", "Lucida Sans", "Gills Sans", "Franklin Gothic Medium", "Courier New"]

    addToOption(fonts,datalist)
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
// change to new font function
function changeFont(fontType){
    document.body.style=`font-family: ${fontType};`
}
function addToOption(fonts,dataListHTML){
    let result = []
    fonts.forEach(font=>{
        let optTemp = document.createElement("option")
        optTemp.textContent = font
        result.push(optTemp)
    })
    result.forEach(item=>{
        dataListHTML.appendChild(item)
    })
}