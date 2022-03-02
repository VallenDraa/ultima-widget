if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const key = process.env.API_WEATHER_KEY3;
  const json = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
  );
  const data = await json.json();
  const weatherData = data;
  res.json(weatherData);
});

app.get('/position/:lat/:lon', async (req, res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;

  const json = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  );
  const data = await json.json();
  const positionData = data;
  res.json(positionData);
});

app.get('/time/:lat/:lon', async (req, res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;

  const data = await fetch(
    `https://www.timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lon}`
  );
  // console.log(data);
  const json = await data.json();
  const timeData = json;

  res.json(timeData);
});

app.get('/news/:city', async (req, res) => {
  const city = req.params.city;
  const data = await fetch(
    `https://free-news.p.rapidapi.com/v1/search?q=${city}&lang=en`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'free-news.p.rapidapi.com',
        'x-rapidapi-key': 'f985b064ebmsh601af2da22cd878p1550b2jsn10a652b73e8e',
      },
    }
  );

  const json = await data.json();
  const newsData = json;

  res.json(newsData);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000');
});
