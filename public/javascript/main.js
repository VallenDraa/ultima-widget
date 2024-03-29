import * as api from './api.js';
window.scrollTo(0, 0);
document.body.style.overflowY = 'hidden';
// on load get user data and update weather based on user input
window.addEventListener('load', function () {
  checkGeolocation();
  weatherInteraction();
  timeInteraction();
  newsInteraction();
  addTransitionToAll();
  removeLoadingScreen();
});

// check if geolocation is allowed
function checkGeolocation() {
  navigator.geolocation.watchPosition(
    function () {
      return;
    },
    function (error) {
      return;
    }
  );

  api.userLocation.getUserLocation();
}

// website interaction
const weatherInteraction = function () {
  // search bar eventlistener
  document.querySelector('.search-bar').addEventListener('change', function () {
    api.weather.fetchWeatherData(this.value);
  });
  document
    .querySelector('.search-bar')
    .addEventListener('.keyup', function (e) {
      if (e.keyCode === 13 && this.value != '') {
        api.weather.fetchWeatherData(this.value);
      }
    });
  // more details weather buttons
  document
    .querySelector('#bottom-data-weather')
    .addEventListener('mouseover', function () {
      document
        .querySelector('.details-btn-weather')
        .setAttribute('style', 'opacity:1');
    });
  document
    .querySelector('#bottom-data-weather')
    .addEventListener('mouseleave', function () {
      document
        .querySelector('.details-btn-weather')
        .setAttribute('style', 'opacity:0');
    });
  const moreDetail = document.querySelector('.more-details');
  document
    .querySelector('.details-btn-weather')
    .addEventListener('click', function () {
      moreDetail.classList.toggle('make-visible-more-details');
    });
  // close more weather details menu buttons
  document
    .querySelector('.back-to-main-weather')
    .addEventListener('click', function () {
      moreDetail.classList.toggle('make-visible-more-details');
    });

  // footer shake
  document.querySelector('.footer').addEventListener('click', function () {
    this.style.animation = 'shake 0.7s ease-in-out';
    setTimeout(() => {
      this.style.animation = '';
    }, 1050);
  });
};
const timeInteraction = function () {
  // more details time details button
  // document
  //   .querySelector('#bottom-data-time')
  //   .addEventListener('mouseover', function () {
  //     document
  //       .querySelector('.details-btn-time')
  //       .setAttribute('style', 'opacity:1');
  //   });
  // document
  //   .querySelector('#bottom-data-time')
  //   .addEventListener('mouseleave', function () {
  //     document
  //       .querySelector('.details-btn-time')
  //       .setAttribute('style', 'opacity:0');
  //   });
  // const moreDetailTime = document.querySelector('.more-details-time');
  // document
  //   .querySelector('.details-btn-time')
  //   .addEventListener('click', function () {
  //     moreDetailTime.classList.toggle('make-visible-more-details');
  //   });
  // close more time details menu buttons
  // document
  //   .querySelector('.back-to-main-time')
  //   .addEventListener('click', function () {
  //     moreDetailTime.classList.toggle('make-visible-more-details');
  //   });
};
const newsInteraction = function () {
  document.querySelector('.search-bar').addEventListener('change', function () {
    api.news.fetchNewsData(this.value);
  });
  document
    .querySelector('.search-bar')
    .addEventListener('.keyup', function (e) {
      if (e.keyCode === 13 && this.value != '') {
        api.news.fetchNewsData(this.value);
      }
    });
};
const removeLoadingScreen = function () {
  const loadingScreen = document.querySelector('.loading');
  loadingScreen.style.animation = 'dissappear 0.7s ease';
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 700);
  document.body.style.overflowY = 'auto';
};
// refresh seconds in time
setInterval(function () {
  if (api.errorList.error_429) return;
  api.times.fetchTimeData(api.weather.latLong[0], api.weather.latLong[1]);
}, 1000);

// misc
function addTransitionToAll() {
  document.querySelectorAll('section').forEach((item) => {
    item.classList.add('transition');
  });
}

function removeTransitionFromAll() {
  document.querySelectorAll('section').forEach((item) => {
    item.classList.remove('transition');
  });
}

// remove transition during screen resizing
window.addEventListener('resize', () => {
  removeTransitionFromAll();
  setTimeout(() => {
    addTransitionToAll();
  }, 1500);
});
