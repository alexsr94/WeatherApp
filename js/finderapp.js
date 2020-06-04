let cities = [];
let selectedCities = [];
const input1 = document.getElementById("input1");
input1.addEventListener("keyup", (e) => {
  cityFinder(e);
});

fetch("http://127.0.0.1:5500/js/cities.json").then((res) => {
  res.json().then((citiesJSON) => {
    cities = citiesJSON;
  });
});

function cityFinder(e) {
  if (e.key === "Backspace" && input1.value.length === 0) {
    document
      .querySelectorAll(".cityListItem")
      .forEach((x) => x.parentNode.removeChild(x));
    document.getElementById("divList").hidden = "true";
  } else {
    document.getElementById("divList").hidden = false;
    document
      .querySelectorAll(".cityListItem")
      .forEach((x) => x.parentNode.removeChild(x));
    const citiesList = document.querySelector(".cities");

    let word = input1.value;

    let options = cities.filter((x) =>
      x.name.toLowerCase().startsWith(word.toLowerCase())
    );
    
    /* for (i = 0; i < options.length; i++) {
      
    }*/
    options.forEach((x) => {
      let citiId = document.querySelectorAll(".today").length;
      let cityListItem = document.createElement("li");
      cityListItem.setAttribute("class", "cityListItem");
      cityListItem.addEventListener("click", (e) => {
        document.getElementById("divList").hidden = "true";
        if (selectedCities.length === 2) {
          window.alert("You only can choose two cities!");
        } else {
          let object = {
            id: "city" + citiId,
            country: x.country,
            city: x.name,
            lat: x.lat,
            lng: x.lng,
          };
          selectedCities.push(object);

          newCityWeather(x.lat, x.lng, object);
        }
      });
      cityListItem.innerText = `${x.name} - ${x.country}`;
      citiesList.appendChild(cityListItem);
    });
  }
}

function newCityWeather(latitud, longitud, obj) {
  fetch(
    "https://api.weatherbit.io/v2.0/current?lang=en&lat=" +
      latitud +
      "&lon=" +
      longitud +
      "&key=" +
      "25217f64f81d4b8d95e85d08ad63bf38"
  ).then((res) => {
    
    res.json().then((dataObject) => {
      
      const temp = dataObject.data[0].temp;
      const description = dataObject.data[0].weather.description;
      const city = dataObject.data[0].city_name;
      const windSpeed = dataObject.data[0].wind_spd;
      const precipitaciones = dataObject.data[0].precip;
      const windDirection = dataObject.data[0].wind_cdir_full;

      //today-forecast
      // forecast-header ---- day ---date
      //forecast-content ----location --degree(div.num-div-forecast-icon(img))
      //span(img span.precip)
      //span(img span.wind)
      //span(img span.wind-direction)
      const todayForecast = document.createElement("div");
      todayForecast.id = obj.id;
      todayForecast.className = "today forecast";
      const forecastHeader = document.createElement("div");
      forecastHeader.className = "forecast-header";
      const day = document.createElement("div");
      day.className = "day";
      day.innerText = "Today";
      const date = document.createElement("div");
      date.className = "date";
      date.innerHTML =
        new Date().toString().slice(0, 10) +
        `<img width="32px" onclick="deleteCity('${obj.id}')" src="/images/icons/trash.svg" alt="trash" />`;
      //juntar header
      forecastHeader.appendChild(day);
      forecastHeader.appendChild(date);
      //header hecho
      const forecastContent = document.createElement("div");
      forecastContent.className = "forecast-content";
      const location = document.createElement("div");
      location.className = "location";
      location.innerHTML = `${city} - ${description}`;
      const degree = document.createElement("div");
      degree.className = "degree";
      const numDegree = document.createElement("div");
      numDegree.className = "num";
      numDegree.innerHTML = `${temp}<sup>o</sup>C`;
      const forecastIcon = document.createElement("div");
      forecastIcon.className = "forecast-icon";
      const descriptionIcon = document.createElement("img");
      descriptionIcon.className = "description-icon";

      if (description.toLowerCase().includes("rain")) {
        descriptionIcon.src = "images/icons/icon-9.svg";
      }
      if (description.toLowerCase().includes("overcast")) {
        descriptionIcon.src = "images/icons/icon-6.svg";
      }
      if (description.toLowerCase().includes("clear")) {
        descriptionIcon.src = "images/icons/icon-2.svg";
      }

      descriptionIcon.style.width = "90";
      //JUNTAR DEGREE
      forecastIcon.appendChild(descriptionIcon);
      degree.appendChild(numDegree);
      degree.appendChild(forecastIcon);
      // DEGREE HECHO
      //crear iconos
      const iconos = document.createElement("div");
      iconos.className = "iconos";
      iconos.innerHTML = `<img src="images/icon-umberella.png" alt="" /><span
                    class="precip"
                  >${precipitaciones} %</span
                >
                <img src="images/icon-wind.png" alt="" /><span
                    class="wind"
                  >${windSpeed} km/h</span
                >
                <img src="images/icon-compass.png" alt="" /><span
                    class="wind-direction"
                  >${windDirection}</span
                >`;
      //JUNTAR FORECAST CONTENT

      forecastContent.appendChild(location);
      forecastContent.appendChild(degree);
      forecastContent.appendChild(iconos);

      //JUNTAR TODAYFORECAST
      todayForecast.appendChild(forecastHeader);
      todayForecast.appendChild(forecastContent);

      //CREAR EL ELEMENTO
      document.getElementById("inicial").appendChild(todayForecast);
    });
  });
  
}
function deleteCity(num) {
  selectedCities = selectedCities.filter(x=>x.id!==num);
  
  document.getElementById(num).remove();
}
