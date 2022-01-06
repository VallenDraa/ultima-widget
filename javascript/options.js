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
    document.querySelectorAll(".news-content").forEach(item => {
        item.classList.toggle("news-content-light")
    })
    document.querySelector(".weather-icon").classList.toggle("weather-icon-light")
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
    let resize =(()=>{content.style.width = `${(70-(this.value-1))-(this.value*3)}%`})()
})
rangeSliders[1].addEventListener("input",function() {
    let resize =(()=>{
        content.style.columnGap = `${6-(this.value-1.75)}rem`
        content.style.rowGap = `${2-(Math.abs(this.value-1.8))}rem`
    })()
})

// font changes input eventlistener
const fonts = ["Open Sans","Jetbrains Mono","Roboto","Lato","Monserrat","Poppins","Oswald","Noto Serif","Oxygen","Ubuntu","Serif","Sans Serif","Monospace","Fantasy","Cursive","Verdana","Impact","Georgia","Cambria","Trebuchet MS","Times New Roman","Segoe UI", "Lucida Sans", "Gills Sans", "Franklin Gothic Medium", "Courier New"]

document.querySelector(".input-font-type").addEventListener("input",function(){
    if(this.value != ""){
        changeFont(this.value, fonts)
    }
})
// wait until option loads and immediately adds datalist
window.addEventListener("load",function(){
    const datalist = document.querySelector("#fontList")
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
function changeFont(fontInput, fontList){
    fontList.forEach(font=>{
        if(fontInput.toLowerCase() == font.toLowerCase()){
            document.body.style=`font-family: '${fontInput}';`
        }
    })
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