const apiKey = "25217f64f81d4b8d95e85d08ad63bf38";
var lat;
var long;
function geoLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
}

async function getWather(latitud, longitud) {
  await fetch(
    "https://api.weatherbit.io/v2.0/current?lang=en&lat=" +
      latitud +
      "&lon=" +
      longitud +
      "&key=" +
      apiKey
  )
    .then((response) => {
      response.json().then((data) => {
        render(data);
      });
    })
    .catch((err) => {
      showError();
    });
}

geoLoc();

function render(dataObject) {
  const temp = dataObject.data[0].temp;
  const description = dataObject.data[0].weather.description;
  const city = dataObject.data[0].city_name;
  const windSpeed = dataObject.data[0].wind_spd;
  const precipitaciones = dataObject.data[0].precip;
  const windDirection = dataObject.data[0].wind_cdir_full;
  descriptionIcon(description);
 let date = document.querySelectorAll(".date");
 date.forEach((x)=>{x.innerHTML=new Date().toString().slice(0,10)})
  document.querySelector(".num").innerHTML = `${temp}<sup>o</sup>C`;
  document.querySelector(".location").innerHTML = `${city} - ${description}`;
  document.querySelector(".wind-direction").innerText = windDirection;
  document.querySelector(".precip").innerText = precipitaciones + " %";
  document.querySelector(".wind").innerText = windSpeed + " km/h";

  //TEMP//
  //descripcion//
  //Ciudad//
  //WIND-SPEED//
  //PRECIP//
  //DATATIME//
}
function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  getWather(lat, long, render, showError);
}
function showError(err) {
  alert(`Something went wrong...`);
  document.querySelector(".num").innerHTML = `Something went wrong...`;
  document.querySelector(
    ".location"
  ).innerHTML = `Check your internet conection...`;
  document.querySelector(".wind-direction").innerText = "";
  document.querySelector(".precip").innerText = "";
  document.querySelector(".wind").innerText = "";
}
function descriptionIcon(string) {
  if (string.toLowerCase().includes("rain")) {
    document.querySelector(".description-icon").src = "images/icons/icon-9.svg";
  }
  if (string.toLowerCase().includes("overcast")) {
    document.querySelector(".description-icon").src = "images/icons/icon-6.svg";
  }
  if (string.toLowerCase().includes("clear")) {
    document.querySelector(".description-icon").src = "images/icons/icon-2.svg";
  }

}
