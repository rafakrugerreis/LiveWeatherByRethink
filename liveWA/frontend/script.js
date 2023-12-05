async function fetchData(url, containerId, displayFunction) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayFunction(data, containerId);
  } catch (error) {
    console.error(`Erro ao obter dados de ${url}:`, error);
  }
}

function createCard(entry) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  if (entry[2] === "Micropartículas Rótula do Tafarel" || entry[2] === "Estação Cruzeiro") {
    cardDiv.classList.add("fixed-card");
  }

  cardDiv.innerHTML = `
      <p>Nome do Dispositivo: ${entry[2]}</p>
      <p>Temperatura: ${entry[3]}°C</p>
      <p>Umidade: ${entry[4]}%</p>
      <p>Pressão: ${entry[5]} hPa</p>
      <p>Altitude: ${entry[6]} metros</p>
      <p>Índice UV: ${entry[7]}</p>
      <ul>
          ${
            entry[9] && entry[9][0]
              ? `<li>Gateway 1: ${entry[9][0].gatewayId}, RSSI: ${entry[9][0].rssi}</li>`
              : ""
          }
          <!-- Adicione mais informações de gateway conforme necessário -->
      </ul>
  `;
  return cardDiv;
}

function displayWeatherData(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  
  if (data.latest_data && data.latest_data.length > 0) {
    data.latest_data.forEach((entry) => {
      const card = createCard(entry);
      container.appendChild(card);
    });
  } else {
    console.error("Erro: 'latest_data' está indefinido ou vazio nos dados recebidos.");
  }
}

function displayMicroparticulasData(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  
  if (data.latest_data && data.latest_data.length > 0) {
    data.latest_data.forEach((entry) => {
      const card = createCard(entry);
      container.appendChild(card);
    });
  } else {
    console.error("Erro: 'latest_data' está indefinido ou vazio nos dados recebidos.");
  }
}

function createCityCard(cityData) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.innerHTML = `
      <p>Cidade: ${cityData.name}</p>
      <p>Temperatura: ${cityData.main.temp}°C</p>
      <p>Umidade: ${cityData.main.humidity}%</p>
      <p>Clima: ${cityData.weather[0].description}</p>
      <p>Velocidade do Vento: ${cityData.wind.speed} m/s</p>
      <p>Pressão Atmosférica: ${cityData.main.pressure} hPa</p>
      <p>Coordenadas: ${cityData.coord.lat}, ${cityData.coord.lon}</p>
      <p>Nascer do Sol: ${new Date(cityData.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Pôr do Sol: ${new Date(cityData.sys.sunset * 1000).toLocaleTimeString()}</p>
  `;
  return cardDiv;
}

function displayCityWeatherData(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  
  if (data.cod === "404") {
    alert("Cidade não encontrada. Por favor, insira um nome de cidade válido.");
    return;
  }

  const cityCard = createCityCard(data);
  container.appendChild(cityCard);
}

function handleSearchButtonClick() {
  const cityInput = document.getElementById('search_input').value;
  fetchData(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&lang=pt_br&units=metric&APPID=64ed82577ced7f69cb1687f0ce536131`,
    "city-weather-container",
    displayCityWeatherData
  );
}

document.getElementById('search_button').addEventListener('click', handleSearchButtonClick);

document.getElementById('search_form').addEventListener('submit', function (event) {
  event.preventDefault();
  handleSearchButtonClick();
});

fetchData(
  "http://localhost:8000/json/dados/",
  "weather-container",
  displayWeatherData
);

fetchData(
  "http://localhost:8000/json/microparticulas/",
  "microparticulas-container",
  displayMicroparticulasData
);
