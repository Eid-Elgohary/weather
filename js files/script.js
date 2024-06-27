
'use strict'

const searchInput = document.querySelector('.searchInput') ;
const searchBtn = document.querySelector('.BtnFind') ;

// current day fields
const currentDay = document.querySelector('.day-span') ;
const currentDate = document.querySelector('.date-span') ;
const city = document.querySelector('.location');
const degree = document.querySelector('.degree');
const icon = document.querySelector('.icon');
const indicator = document.querySelector('.dayInd');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const windDirection = document.querySelector('.windDir');

//  next days fields

const header =Array.from( document.querySelectorAll('.day'));
const weatherIcon =Array.from( document.querySelectorAll('.weather-icon'));
const maxDegree =Array.from( document.querySelectorAll('.max-degree'));
const minDegree =Array.from( document.querySelectorAll('.min-degree'));
const nextDayIndicator =Array.from( document.querySelectorAll(".next"))

const myKey = 'e137955bba7e4d8786b04515242706' ;
const BASEURL ='http://api.weatherapi.com/v1';
let myQuery = "" ;
let myWeatherObj = {};
let defaultWeatherObj = {};
let date = new Date();


displayDefault();


async function setDefaultData(){
   let req = await fetch(`${BASEURL}/forecast.json?key=${myKey}&q=cairo&days=3`);
   let finalReq = await req.json();
   defaultWeatherObj = finalReq ;
}

async function displayDefault(){
   await setDefaultData();
   displayCurrentDay(defaultWeatherObj);
   displayNextDays(defaultWeatherObj);
}


async function getWeather(){
   let req = await fetch(`${BASEURL}/forecast.json?key=${myKey}&q=${myQuery}&days=3`);
   let finalReq = await req.json();
   myWeatherObj = finalReq ;
}

searchInput.addEventListener('input' , function(){
   myQuery = this.value;
   getWeather();
   displayCurrentDay(myWeatherObj) ;
   displayNextDays(myWeatherObj) ;
   console.log(myWeatherObj);
})

function displayCurrentDay(obj){

   currentDate.innerHTML = date.getDate() ;
   currentDay.innerHTML = date.toLocaleDateString('en-us',{weekday:"long"}) ;
   city.innerHTML = obj.location.name ;
   icon.setAttribute('src',obj.current.condition.icon);
   indicator.innerHTML =`${obj.current.condition.text}`;
   degree.innerHTML = `${obj.current.temp_c}<sup>°</sup>C`;
   wind.innerHTML = `${obj.current.wind_kph} km/h`;
   humidity.innerHTML = `${obj.current.humidity}%`;
   windDirection.innerHTML = `${obj.current.wind_dir}`
}

function displayNextDays(obj){

   for(let i = 0 ; i < 2 ; i++){
      let date = new Date(obj.forecast.forecastday[i + 1].date);
      header[i].innerHTML = date.toLocaleDateString('en-us',{weekday:'long'}) ;
      weatherIcon[i].setAttribute('src',obj.forecast.forecastday[i + 1].day.condition.icon) ;
      maxDegree[i].innerHTML = `${obj.forecast.forecastday[i + 1].day.maxtemp_c}<sup>°</sup>C `;
      minDegree[i].innerHTML = `${obj.forecast.forecastday[i + 1].day.mintemp_c}<sup>°</sup>C` ;
      nextDayIndicator[i].innerHTML = obj.forecast.forecastday[i + 1].day.condition.text ;
   }
   
}