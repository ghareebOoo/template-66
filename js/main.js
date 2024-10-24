let todayName = document.getElementById("today-name");
let todayNumber = document.getElementById("today-number");
let todayMonth = document.getElementById("today-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayConditionImg = document.getElementById("today-img");
let todayConditionText = document.getElementById("today-weather");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let Direction = document.getElementById("direction");



let nextDay = document.getElementsByClassName("next-name");
let nextMaxTemp = document.getElementsByClassName("next-max");
let nextMinTemp = document.getElementsByClassName("next-min");
let nextConditionImg = document.getElementsByClassName("next-img");
let nextConditionText = document.getElementsByClassName("next-text");

let searchInput = document.getElementById("search");





async function getWeatherDate(cityName){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cc6657ea19994e36907162021240509&q=${cityName}&days=3&aqi=no&alerts=no`);
    let data = await weatherResponse.json();
    return data
}


function displayTodayDay(data){
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-us" , {weekday: "long" });
    todayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us" , {month: "long" });
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src" ,  'https:'+data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity+"%";
    wind.innerHTML = data.current.wind_kph+"km/h";
    Direction.innerHTML = data.current.wind_dir;
}


function displayNextDate(data){
    let forecastData = data.forecast.forecastday;
    for(let i = 0; i < 2; i++){
        let nextDate = new Date(forecastData[i+1].date);
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us" , {weekday: "long"});
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src" , 'https:'+forecastData[i+1].day.condition.icon);
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text;
    }
}

async function startApp(city = "cairo"){
    let weatherData = await getWeatherDate(city);
    if(!weatherData.error){
        displayTodayDay(weatherData);
        displayNextDate(weatherData);
    }
}
startApp();


searchInput.addEventListener("input" , function(){
    startApp(searchInput.value);
})



navigator.geolocation.getCurrentPosition(loca =>{
    let liveLocation = loca.coords.latitude+','+loca.coords.longitude
    startApp(liveLocation);
})