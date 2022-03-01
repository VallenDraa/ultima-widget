// dark/light mode event listeners
let lightMode = false;
const cards = document.querySelectorAll(".card")
document.querySelector(".toggle-display").addEventListener("click",function(){
    lightMode = !lightMode
    changeStyle.turnLightMode()
    changeStyle.changeButtonStyle()
    changeStyle.innerCircleConfigs() 
    changeStyle.changeSliderStyle()
    changeStyle.changeScrollbarStyle()
    changeStyle.changeNewsContentStyle()
    changeStyle.changeWeatherIconStyle()
    glass.forSwitchToGlass.displayTransparentConfig()
})
// this object contains all the functions for dark/light mode
const changeStyle = {
    turnLightMode: function(){
        document.querySelectorAll(".card").forEach(item => {
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
    },
    changeButtonStyle: function(){
        document.querySelectorAll(".toggle-btn").forEach(item => {
            item.classList.toggle("toggle-btn-change-color")
        })
        document.querySelectorAll(".toggle-btn > .fas").forEach(item => {
            item.classList.toggle("icon-text-black")
        })    
        document.querySelectorAll(".text-btn>p").forEach(item => {
            item.classList.toggle("icon-text-black")
        })
    },
    innerCircleConfigs: function() {
        document.querySelectorAll(".inner-circle")[0].classList.toggle("move-inner-circle")
    
        document.querySelectorAll(".inner-circle").forEach(item => {
            item.classList.toggle("bg-dimgray")
        })
    },
    changeSliderStyle: function() {
        document.querySelectorAll(".slider").forEach(item => {
            item.classList.toggle("bg-lightergray")
        })
        document.querySelectorAll(".slider>p").forEach(item => {
            item.classList.toggle("icon-text-black")
        })
    },
    changeScrollbarStyle: function() {
        document.querySelectorAll(".-webkit-scrollbar-dark").forEach(item => {
            item.classList.toggle("-webkit-scrollbar-light")
        })  
    },
    changeNewsContentStyle: function(){
        document.querySelectorAll(".news-content").forEach(item => {
            item.classList.toggle("news-content-light")
        })
    },
    changeWeatherIconStyle: function(){
        document.querySelector(".weather-icon").classList.toggle("weather-icon-light")
    }    
}



// rgb shuffle
let rgbOn = false;
let rgbInterval = "";
document.querySelector(".toggle-rgb").addEventListener("click",function() {
    rgb.forEventListener.checkIfTransparentAndExec()
})
document.querySelector(".interval-input").addEventListener("input",function() {
   rgb.forEventListener.checkInputValue(this.value)
})
// this object contains all the functions for rgb option
const rgb = {
    forEventListener:{
        checkIfTransparentAndExec: function(){
            if(isGlassed == false){
                rgbOn = !rgbOn
                document.querySelectorAll(".inner-circle")[2].classList.toggle("move-inner-circle")
                rgb.forChangingRGB.RGBMode(rgbInterval) 
            }
        },  
        checkInputValue: function(value){
            if(/[0-9]/.test(value)){
                if(rgbOn == true) return;
                rgbInterval = parseInt(value)
            }
        }
    },
    forChangingRGB:{
        RGBMode: function(timeInterval){
            let shuffleColor; 
            if(timeInterval == ""){
                timeInterval = 2500
            }
            else{
                timeInterval = timeInterval *1000
            }

            this.changeShadowToRandom()
            shuffleColor = setInterval(()=>{      
                this.changeShadowToRandom()

                if(isGlassed == true || rgbOn == false){
                    clearInterval(shuffleColor)
                    rgb.forChangingRGB.shadowToNormal()  
                }
            },timeInterval)              
        },
        changeShadowToRandom: function(){
            let r = Math.round(Math.random() *255+1),
            g = Math.round(Math.random() *255+1),
            b = Math.round(Math.random() *255+1);
            document.querySelectorAll(".card").forEach(card=>{
                card.setAttribute("style", `box-shadow: rgb(${r},${g},${b}) 0px 1px 1px, rgb(${r},${g},${b}) 0px 2px 2px, rgb(${r},${g},${b}) 0px 4px 4px, rgb(${r},${g},${b}) 0px 8px 8px, rgb(${r},${g},${b}) 0px 16px 16px;`)
            })            
        },
        shadowToNormal: function(){
            document.querySelectorAll(".card").forEach(card=>{
                card.setAttribute("style",`box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 1px, rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.4) 0px 4px 4px, rgba(0, 0, 0, 0.4) 0px 8px 8px, rgba(0, 0, 0, 0.4) 0px 16px 16px;`)
            })   
        }
    }
}




// transparent
let isGlassed = false;
document.querySelector(".toggle-transparent").addEventListener("click",function() {
    isGlassed = !isGlassed
    glass.forToggleBtn.moveInnerCircle()
    glass.forSwitchToGlass.glassmode()

    // remove the rgb mode if transparent is enabled
    if(document.querySelectorAll(".inner-circle")[2].classList.contains("move-inner-circle")){
        document.querySelectorAll(".inner-circle")[2].classList.remove("move-inner-circle")
        rgbOn = false  
        rgb.forChangingRGB.RGBMode()
    }
})
const glass ={ 
    forToggleBtn:{
        moveInnerCircle : function(){
            document.querySelectorAll(".inner-circle")[1].classList.toggle("move-inner-circle")
        }
    },
    forSwitchToGlass:{
        cards: document.querySelectorAll(".card"),
        glassmode: function(){
            this.cards.forEach(item => {
                if(lightMode){
                    item.classList.toggle("transparent-dark")
                    document.body.classList.toggle("lighten-bg")
                }
                else{
                    item.classList.toggle("transparent-light")
                }
                item.classList.toggle("tp-on")

            })            
        },
        displayTransparentConfig: function(){
            this.cards.forEach(item => {
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
    }
}




// slider eventlistener
const rangeSliders = document.querySelectorAll(".opt-range")    
const content= document.querySelector(".content")
// outer spacing slider
rangeSliders[0].addEventListener("input",function() {
    let resize =(()=>{content.style.width = `${(70-(this.value-1))-(this.value*3)}%`})()
})
rangeSliders[1].addEventListener("input",function() {
    let resize =(()=>{content.style.gap = `${2-(Math.abs(this.value-1.9))}rem`})()
})




// font changes input eventlistener
const fonts ={
    list:["Open Sans","Jetbrains Mono","Roboto","Lato","Monserrat","Poppins","Oswald","Noto Serif","Oxygen","Ubuntu","Serif","Sans Serif","Monospace","Fantasy","Cursive","Verdana","Impact","Georgia","Cambria","Trebuchet MS","Times New Roman","Segoe UI", "Lucida Sans", "Gills Sans", "Franklin Gothic Medium", "Courier New"]
}
document.querySelector(".input-font-type").addEventListener("input",function(){
    if(this.value != ""){
        changeFont(this.value, fonts.list)
    }
})
// wait until option loads and immediately adds datalist
window.addEventListener("load",function(){
    const datalist = document.querySelector("#fontList")
    addToOption(fonts.list,datalist)
})
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