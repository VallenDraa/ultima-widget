import * as api from "./api.js";

// on load get user data and update weather based on user input
window.addEventListener("load", function(){
    api.weather.fetchWeatherData("NEW YORK CITY")
    api.userLocation.getUserLocation()
})

// website interaction 
// search bar eventlistener
document.querySelector(".search-bar").addEventListener("input", function(){
    if(this.value.length < 2){
        return;
    }
    api.weather.fetchWeatherData(this.value)
})

// more details weather buttons
const moreDetail = document.querySelector(".more-details")
document.querySelector(".fa-ellipsis-v").addEventListener("click",function(){
    moreDetail.setAttribute("style","opacity:1; z-index: 20")
})

// close more details menu buttons
document.querySelector(".fa-times-circle").addEventListener("click",function(){
    moreDetail.setAttribute("style","opacity:0; z-index:-10")
})
