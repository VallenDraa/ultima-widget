export const weather = {
    // get all weather data and assign it into the html 1
    fetchWeatherData: function(city){
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=262baac3e5df844f9992d3d71cf510cf`)
            .then(response => response.json())
            .then(weatherData => this.assignData(weatherData))
            .catch(err => console.log(err))
    },
    assignData: function(datas){
        try{
            const {name,visibility} = datas
            const {icon,main} = datas.weather[0]
            const {temp,feels_like,temp_min,temp_max,pressure,humidity} = datas.main
            const {speed,deg} = datas.wind
            const {country} = datas.sys
            const {lon,lat} = datas.coord
            
            this.updateDataUI(name,icon,main,temp,humidity,speed)     
            this.updateMoreDataUI(visibility,feels_like,temp_min,temp_max,pressure,deg,country, lon,lat,temp,speed,humidity,name)       
        }
        catch(err){
            console.log(err)
        }

    },
    updateDataUI: function(name,icon,main,temp,humidity,speed){
        document.querySelector(".city").textContent = name
        document.querySelector(".temp").textContent = `${Math.floor(temp)}°c`
        document.querySelector(".icon").setAttribute("src",`https://openweathermap.org/img/wn/${icon}.png`)
        document.querySelector(".weather").textContent = main
        document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`
        document.querySelector(".wind-speed").textContent = `Wind Speed: ${Math.floor(speed)}km/h`
    },
    updateMoreDataUI: function(visibility,feels_like,temp_min,temp_max,pressure,deg,country, lon,lat,temp,speed,humidity,name){
        document.querySelector(".other-city").textContent = name
        document.querySelector(".lat").textContent = `Latitude: ${lat}`
        document.querySelector(".long").textContent = `Longitude: ${lon}`
        document.querySelector(".current-temp").textContent = `Current Temperature: ${temp}°c`
        document.querySelector(".feels").textContent = `Feels Like: ${feels_like}°c`
        document.querySelector(".min").textContent = `Minimal Temperature: ${temp_min}°c`
        document.querySelector(".max").textContent = `Maximum Temperature: ${temp_max}°c`
        document.querySelector(".speed").textContent = `Speed: ${speed}km/h`
        document.querySelector(".deg").textContent = `Degree: ${deg}°`
        document.querySelector(".vis").textContent = `Visibility: ${visibility}`
        document.querySelector(".press").textContent = `Pressure: ${pressure}`
        document.querySelector(".other-humid").textContent = `Humidity: ${humidity}%`
        document.querySelector(".country").textContent = `Country: ${country}`
    }   
    
}

// get user location
export const userLocation = {
    getUserLocation:function(){
        // if user allows to get their location checked
        const success = async position => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            console.log(`Your latitude: ${latitude}\nYour longitude: ${longitude}`)
            
            const userCity = await userLocation.fetchCity(latitude, longitude)
            userLocation.updateWeatherToUserLoc(userCity)
        }
        //if user don't want to get their location checked
        const error = error=> console.log(error)

        // get the longitude and latitude
        navigator.geolocation.getCurrentPosition(success,error)
    },

    fetchCity: function(latitude,longitude){
        return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(locationData =>locationData.localityInfo.administrative[2].name)
        .catch(error => console.log(error))
    },

    updateWeatherToUserLoc: function(userCity){
        weather.fetchWeatherData(userCity)
    }
}