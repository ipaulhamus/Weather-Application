import { readCookieZip, readCookieEmail } from "./readJSON.mjs";
import {checkCookie, checkDarkMode } from "./checkCookie.mjs";

let api = `https://api.openweathermap.org/data/2.5/weather?zip=${readCookieZip()},us&appid=354db84eeb2457b689417496fb5d4156&units=imperial`;

let tempFill = document.getElementById('temp');
let windFill = document.getElementById('wind-speed');
let humidityFill = document.getElementById('humidity');
let descriptionFill = document.getElementById('description');
let nameFill = document.getElementById('name');

const REFRESH_INTERVAL = 30;
let refreshTimer = REFRESH_INTERVAL;

function getWeatherData()
{
    let weatherData = new Promise((resolve, reject) =>
    {
        fetch(api)
            .then(response =>
            {
                if(response.ok === false)
                {
                    throw new Error('Weather data not found!');
                }

                return response.json();
            })
            .then(data =>
            {
                resolve(data);
            })
            .catch(error =>
            {
                reject(error);
            });
    });

    return weatherData;
}

let weatherData = getWeatherData();

document.addEventListener('DOMContentLoaded', async() =>
{
    checkDarkMode();

    if(checkCookie() === false)
    {
        window.location = './login.html';
        window.alert('Please log in before accessing our services!');
    }

    await refreshPage();

    document.getElementById('zip-code')
        .innerHTML = `${readCookieZip()}`;
    document.getElementById('email')
        .innerHTML = `${readCookieEmail()}`;

    weatherData.then((data) =>
    {
        console.log(data);
        showData(data);
    })
        .catch((error) =>
        {
            console.error(error);
        });
});

function showData(data)
{
    tempFill.innerHTML = data.main.temp.toString();
    windFill.innerHTML = data.wind.speed;
    humidityFill.innerHTML = data.main.humidity;
    descriptionFill.innerHTML = data.weather[0].description;
    nameFill.innerHTML = data.name;
}

async function refreshPage()
{
    if(--refreshTimer <= 0)
    {
        const data = await getWeatherData();
        showData(data);
        refreshTimer = REFRESH_INTERVAL;
        console.log("Page refreshed!")
    }

    setTimeout(refreshPage, 1000);
}