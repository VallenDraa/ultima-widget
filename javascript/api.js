// get weather data
export const weather = {
    // get all weather data and assign it into the html 1
    fetchWeatherData: function(city){
        const apiKey1 = "262baac3e5df844f9992d3d71cf510cf"
        const apiKey2 = "b190a0605344cc4f3af08d0dd473dd25"
        const apiKey3 = "9a14131d21314caaf8e9208f49b174d4"
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey2}`)
            .then(response => response.json())
            .then(weatherData => errorFuncs.checkStatusCode(weatherData.cod, this.assignData(weatherData)))
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
            
            // update weather data ui
            this.updateDataUI(name,icon,main,temp,humidity,speed)     
            // update more weather data ui
            this.updateMoreDataUI(visibility,feels_like,temp_min,temp_max,pressure,deg,country, lon,lat,temp,speed,humidity,name) 
            // call the fetchdata function      
            this.latLong = [lat,lon]
            times.fetchTimeData(this.latLong[0],this.latLong[1])      
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
    },
    latLong: []
}

// get user location
export const userLocation = {
    getUserLocation: function(){
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

// get time data
export const times ={
    fetchTimeData : function (lat,long){
        return fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=KLM734BAJD6C&format=json&by=position&lat=${lat}&lng=${long}`)
        .then(response => response.json())
        .then(timeData => this.assignTimeData(timeData))
        .catch(error => console.log(error))
    },
    assignTimeData: function(timeData){
        const {countryCode,countryName,zoneName,abbreviation,gmtOffset,dst,zoneStart,timestamp,formatted} = timeData 
        const dateAndTime = formatted.split(" ")
        // console.log(countryCode,countryName,zoneName,abbreviation,gmtOffset,dst,zoneStart,timestamp,formatted,dateAndTime)
        this.updateTimeUI(dateAndTime[1],dateAndTime[0],abbreviation,zoneName,gmtOffset)
        this.updateTimeDetailUI(countryCode,countryName,dst,gmtOffset,zoneStart,timestamp)
    },
    updateTimeUI: function(time,date,abbreviation,zoneName,gmtOffset){
        document.querySelector(".current-time").textContent = time
        document.querySelector(".date").textContent = date
        document.querySelector(".timezone").textContent = `Timezone: ${abbreviation}`
        document.querySelector(".zone").textContent = `Area Zone: ${zoneName}`
        document.querySelector(".offset").textContent = `GMT Offset: ${gmtOffset}`
    },
    updateTimeDetailUI : function(countryCode,countryName,dst,gmtOffset,zoneStart,timestamp){
        document.querySelector(".country-code").textContent = `Country Code: ${countryCode}`
        document.querySelector(".country-name").textContent = `Country Name: ${countryName}`
        document.querySelector(".dst").textContent = `DST: ${dst}`
        document.querySelector(".offset-detail").textContent = `GMT Offset: ${gmtOffset}`
        document.querySelector(".zone-start").textContent = `Zone Start: ${zoneStart}`
        document.querySelector(".timestamp").textContent = `Timestamp: ${timestamp}`
    }
}

// error handling functions
export const errorFuncs ={
    checkStatusCode: function(statusCode, functionToExecute){
        switch (statusCode) {
            case 429:
                errorFuncs.tooManyRequest()
                break;
            default:
                functionToExecute
                break;
        }
    },
    tooManyRequest: function(){
        alert("Too many api requests to the server, please try again later!")
        return errorList.error_429 = true;
    }
}

// error list
export const errorList = {
    error_429: false
}