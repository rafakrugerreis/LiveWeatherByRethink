
const api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
  }
  
  const city = document.querySelector('.city')
  const date = document.querySelector('.date');
  const container_img = document.querySelector('.container-img');
  const container_temp = document.querySelector('.container-temp');
  const temp_number = document.querySelector('.container-temp div');
  const temp_unit = document.querySelector('.container-temp span');
  const weather_t = document.querySelector('.weather');
  const search_input = document.querySelector('.form-control');
  const search_button = document.querySelector('.btn');
  const low_high = document.querySelector('.low-high');
  
search_button.addEventListener('click', function () {
    searchResults(search_input.value);
});

search_input.addEventListener('keypress', enter);

function enter(event) {
    var key = event.keyCode;
    if (key === 13) {
        searchResults(search_input.value);
    }
}

function searchResults(city) {
    fetch(api.base + "weather?q=" + city + "&lang=" + api.lang + "&units=" + api.units + "&APPID=" + api.key)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("http error: status " + response.status);
            }
            return response.json();
        })["catch"](function (error) {
            alert(error.message);
        })
        .then(function (response) {
            displayResults(response);
        });
}


