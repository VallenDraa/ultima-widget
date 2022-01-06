// options
// dark/light mode event listeners
let lightMode = false;
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
    document.querySelectorAll(".text-btn>p").forEach(item => {
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


// transparent
let isTransparent = false;
document.querySelector(".toggle-transparent").addEventListener("click",function() {
    isTransparent = !isTransparent
    console.log(isTransparent)
    document.querySelectorAll(".inner-circle")[1].classList.toggle("move-inner-circle")
    glassmode()

    // remove the rgb mode if transparent is enabled
    if(document.querySelectorAll(".inner-circle")[2].classList.contains("move-inner-circle")){
        document.querySelectorAll(".inner-circle")[2].classList.remove("move-inner-circle")
        RGBMode()        
    }
})

// rgb shuffle
let rgbOn = false;
let rgbInterval = "";
document.querySelector(".toggle-rgb").addEventListener("click",function() {
    rgbOn = !rgbOn
    if(isTransparent == false){
        document.querySelectorAll(".inner-circle")[2].classList.toggle("move-inner-circle")
        RGBMode(rgbInterval)        
    } 
})
document.querySelector(".interval-input").addEventListener("input",function() {
    if(/[0-9]/.test(this.value)){
       if(rgbOn == true){
           RGBMode(parseInt(this.value))
       }
       else{
           rgbInterval = parseInt(this.value)
       } 
    }
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
function glassmode(){
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
// RGB Mode On
function RGBMode(timeInterval){    
    let shuffleColor; 
    if(timeInterval == ""){
        timeInterval = 2500
    }
    else{
        timeInterval = timeInterval *1000
    }
    clearInterval(shuffleColor)
            document.querySelectorAll(".card").forEach(card=>{
                card.setAttribute("style",`0px 10px 10px rgba(0, 0, 0, 0.4);`)
    })   
    shuffleColor = setInterval(()=>{    
        let r = Math.round(Math.random() *255+1),
        g = Math.round(Math.random() *255+1),
        b = Math.round(Math.random() *255+1);
        document.querySelectorAll(".card").forEach(card=>{
            card.setAttribute("style", `box-shadow: 5px 10px 10px rgb(${r},${g},${b})`)
        })

        if(isTransparent == true || rgbOn == false){
            clearInterval(shuffleColor)
            document.querySelectorAll(".card").forEach(card=>{
                card.setAttribute("style",`0px 10px 10px rgba(0, 0, 0, 0.4);`)
            })   
        }
    },timeInterval)        
}