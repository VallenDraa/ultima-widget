import * as api from "./api.js";

// on load get user data and update weather based on user input
window.addEventListener("load", function(){
    if(api.errorList.error_429) return;
    api.weather.fetchWeatherData("NEW YORK CITY")
    api.userLocation.getUserLocation()    
    weatherInteraction()
    timeInteraction()
})

// website interaction 
const weatherInteraction = function(){
    // search bar eventlistener
    document.querySelector(".search-bar").addEventListener("change", function(){
        api.weather.fetchWeatherData(this.value)
    })
    document.querySelector(".search-bar").addEventListener(".keyup",function(e){
        if(e.keyCode === 13 && this.value != ""){
            api.weather.fetchWeatherData(this.value)
        }
    })
    // more details weather buttons
    document.querySelector("#bottom-data-weather").addEventListener("mouseover", function(){
        document.querySelector(".details-btn-weather").setAttribute("style","opacity:1")
    })
    document.querySelector("#bottom-data-weather").addEventListener("mouseleave",function(){
        document.querySelector(".details-btn-weather").setAttribute("style","opacity:0")
    })
    const moreDetail = document.querySelector(".more-details")
    document.querySelector(".details-btn-weather").addEventListener("click",function(){
        moreDetail.classList.toggle("make-visible-more-details")
    })
    // close more weather details menu buttons
    document.querySelector(".back-to-main-weather").addEventListener("click",function(){
        moreDetail.classList.toggle("make-visible-more-details")
    })

    // footer shake
    document.querySelector(".footer").addEventListener("click",function(){
        this.style.animation = "shake 0.7s ease-in-out"
        setTimeout(()=>{this.style.animation = ""},1050)
    })
}
const timeInteraction = function(){
    // more details time details button
    document.querySelector("#bottom-data-time").addEventListener("mouseover", function(){
        document.querySelector(".details-btn-time").setAttribute("style","opacity:1")
    })
    document.querySelector("#bottom-data-time").addEventListener("mouseleave",function(){
        document.querySelector(".details-btn-time").setAttribute("style","opacity:0")
    })

    const moreDetailTime = document.querySelector(".more-details-time")
    document.querySelector(".details-btn-time").addEventListener("click",function(){
        moreDetailTime.classList.toggle("make-visible-more-details")
    })

    // close more time details menu buttons
    document.querySelector(".back-to-main-time").addEventListener("click",function(){
        moreDetailTime.classList.toggle("make-visible-more-details")
    })
}

// refresh seconds in time
setInterval(function(){
    if(api.errorList.error_429) return;
    api.times.fetchTimeData(api.weather.latLong[0], api.weather.latLong[1])
},1000)
