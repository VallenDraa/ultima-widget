// get weather data NOW
export const weather = {
  // get all weather data and assign it into the html 1
  fetchWeatherData: function (city) {
    return fetch(`/weather/${city}`)
      .then((response) => {
        return response.json();
      })
      .then((weatherData) => {
        errorFuncs.checkStatusCode(
          weatherData.cod,
          this.assignData(weatherData)
        );
        weatherData.cod == 404
          ? (news.proceedToFetch = false)
          : (news.proceedToFetch = true);
      })
      .catch((err) => console.log(err));
  },

  assignData: function (datas) {
    try {
      const { name, visibility } = datas;
      const { icon, main } = datas.weather[0];
      const { temp, feels_like, temp_min, temp_max, pressure, humidity } =
        datas.main;
      const { speed, deg } = datas.wind;
      const { country } = datas.sys;
      const { lon, lat } = datas.coord;

      // update weather data ui
      this.updateDataUI(name, icon, main, temp, humidity, speed);
      // update more weather data ui
      this.updateMoreDataUI(
        visibility,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        deg,
        country,
        lon,
        lat,
        temp,
        speed,
        humidity,
        name
      );
      // call the fetchdata function
      this.latLong = [lat, lon];
      times.fetchTimeData(this.latLong[0], this.latLong[1]);
    } catch (err) {
      console.log(err);
    }
  },

  updateDataUI: function (name, icon, main, temp, humidity, speed) {
    document.querySelector('.city').textContent = name;
    document.querySelector('.temp').textContent = `${Math.floor(temp)}°c`;
    document
      .querySelector('.weather-icon')
      .setAttribute('src', `https://openweathermap.org/img/wn/${icon}.png`);
    document.querySelector('.weather').textContent = main;
    document.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
    document.querySelector(
      '.wind-speed'
    ).textContent = `Wind Speed: ${Math.floor(speed)}km/h`;
  },

  updateMoreDataUI: function (
    visibility,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    deg,
    country,
    lon,
    lat,
    temp,
    speed,
    humidity,
    name
  ) {
    document.querySelector('.other-city').textContent = name;
    document.querySelector('.lat').textContent = `Latitude: ${lat}°`;
    document.querySelector('.long').textContent = `Longitude: ${lon}°`;
    document.querySelector(
      '.current-temp'
    ).textContent = `Temperature: ${temp}°c`;
    document.querySelector(
      '.feels'
    ).textContent = `Feels Like: ${feels_like}°c`;
    document.querySelector(
      '.min'
    ).textContent = `Min Temperature: ${temp_min}°c`;
    document.querySelector(
      '.max'
    ).textContent = `Max Temperature: ${temp_max}°c`;
    document.querySelector('.speed').textContent = `Speed: ${speed}km/h`;
    document.querySelector('.deg').textContent = `Degree: ${deg}°`;
    document.querySelector('.vis').textContent = `Visibility: ${
      visibility / 1000
    } km`;
    document.querySelector('.press').textContent = `Pressure: ${pressure} mb`;
    document.querySelector(
      '.other-humid'
    ).textContent = `Humidity: ${humidity}%`;
    document.querySelector('.country').textContent = `Country: ${country}`;
  },

  latLong: [],
};

// get user location
export const userLocation = {
  getUserLocation: function () {
    // if user allows to get their location checked
    const success = async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      //   console.log(`Your latitude: ${latitude}\nYour longitude: ${longitude}`);

      const userCity = await userLocation.fetchCity(latitude, longitude);
      userLocation.reupdateWeatherAndNews(userCity);
    };
    //if user don't want to get their location checked
    const error = (error) => console.log(error);

    // get the longitude and latitude
    navigator.geolocation.getCurrentPosition(success, error);
  },

  fetchCity: function (latitude, longitude) {
    return fetch(`/position/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then((locationData) => locationData.localityInfo.administrative[2].name)
      .catch((error) => console.log(error));
  },

  reupdateWeatherAndNews: function (userCity) {
    weather.fetchWeatherData(userCity);
    news.fetchNewsData(userCity);
  },
};

// get time data
export const times = {
  fetchTimeData: function (lat, long) {
    return fetch(`/time/${lat}/${long}`)
      .then((response) => response.json())
      .then((timeData) => this.assignTimeData(timeData))
      .catch((error) => console.log(error));
  },

  assignTimeData: function (timeData) {
    let { timeZone, currentLocalTime, hasDayLightSaving } = timeData;
    currentLocalTime = currentLocalTime.split('T');
    currentLocalTime[1] = this.formatTime(currentLocalTime[1]);

    this.updateTimeUI(
      currentLocalTime[1],
      currentLocalTime[0],
      timeZone,
      hasDayLightSaving
    );
  },

  updateTimeUI: function (time, date, zoneName, daylightSaving) {
    document.querySelector('.current-time').textContent = time;
    document.querySelector('.date').textContent = date;
    document.querySelector('.zone').textContent = `Area Zone: ${zoneName}`;
    document.querySelector(
      '.daylight-saving'
    ).textContent = `Day Light Saving: ${daylightSaving}`;
  },

  updateTimeDetailUI: function (
    countryCode,
    countryName,
    dst,
    gmtOffset,
    zoneStart,
    timestamp
  ) {
    document.querySelector(
      '.country-code'
    ).textContent = `Country Code: ${countryCode}`;
    document.querySelector(
      '.country-name'
    ).textContent = `Country Name: ${countryName}`;
    document.querySelector('.dst').textContent = `DST: ${dst}`;
    document.querySelector(
      '.offset-detail'
    ).textContent = `GMT Offset: ${gmtOffset}`;
    document.querySelector(
      '.zone-start'
    ).textContent = `Zone Start: ${zoneStart}`;
    document.querySelector(
      '.timestamp'
    ).textContent = `Timestamp: ${timestamp}`;
  },
  formatTime: function (time) {
    time = time.split(':');
    time[2] = ('0' + Math.round(time[2]).toString()).slice(-2);
    time = time.join(':');
    return time;
  },
};

// get news data
export const news = {
  proceedToFetch: true,
  cityName: '',
  fetchNewsData: function (city) {
    setTimeout(() => {
      if (this.proceedToFetch) {
        this.cityName = city;
        const formattedCity = city.replace(' ', '%20');
        return fetch(`/news/${formattedCity}`)
          .then((response) => response.json())
          .then((newsData) => this.assignNewsData(newsData))
          .catch((err) => {
            console.error(err);
          });
      }
    }, 600);
  },
  assignNewsData: function (newsData) {
    const newsArticles = newsData.articles;
    this.updateNewsUI(newsArticles);
  },
  updateNewsUI: function (newsArticles) {
    let result = '';
    if (newsArticles !== undefined) {
      for (let i = 0; i < newsArticles.length; i++) {
        let newsHTML = `       
                <article class="news-content news-content-dark">       
                    <img src="${newsArticles[i].media}" alt="">
                    <div class ="news-content-text">
                        <h4 class="news-title">${newsArticles[i].title}</h4>
                        <a href="${newsArticles[i].link}" target="_blank" class="news-link">Read More</a>
                        <p class="news-summary">${newsArticles[i].summary}</p>
                    </div>
                </div>
            </article>  
            `;
        result += newsHTML;
      }
      document.querySelector('.inner-news').innerHTML = result;
      document.querySelector('.inner-news').innerHTML +=
        '<p style="text-align:center; font-size: 0.6rem"> End Of Latest News</p>';
    } else {
      if (this.cityName != '') {
        document.querySelector(
          '.inner-news'
        ).innerHTML = `<p style="padding: 1rem 0 0 0;">Sorry No News Available From ${news.cityName}</p>`;
      } else {
        document.querySelector(
          '.inner-news'
        ).innerHTML = `<p style="padding: 1rem 0 0 0;">Type a Place Or a City Name In The Search Bar....</p>`;
      }
    }
  },
};

// error handling functions
export const errorFuncs = {
  checkStatusCode: function (statusCode, functionToExecute) {
    switch (statusCode) {
      case 429:
        errorFuncs.tooManyRequest();
        break;
      default:
        functionToExecute;
        break;
    }
  },

  tooManyRequest: function () {
    alert('Too many api requests to the server, please try again later!');
    return (errorList.error_429 = true);
  },
};

// error list
export const errorList = {
  error_429: false,
  error_404: false,
  error_400: false,
  error_500: false,
  error_403: false,
  error_401: false,
};
