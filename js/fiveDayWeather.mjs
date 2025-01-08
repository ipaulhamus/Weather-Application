import { readCookieZip, readCookieEmail } from "./readJSON.mjs";
import {checkCookie, checkDarkMode} from "./checkCookie.mjs";

let api = `https://api.openweathermap.org/data/2.5/forecast?zip=${readCookieZip()},us&appid=354db84eeb2457b689417496fb5d4156&units=imperial`;

let tempFill1 = document.getElementById('temp-1');
let windFill1 = document.getElementById('wind-speed-1');
let humidityFill1 = document.getElementById('humidity-1');

let tempFill2 = document.getElementById('temp-2');
let windFill2 = document.getElementById('wind-speed-2');
let humidityFill2 = document.getElementById('humidity-2');

let tempFill3 = document.getElementById('temp-3');
let windFill3 = document.getElementById('wind-speed-3');
let humidityFill3 = document.getElementById('humidity-3');

let tempFill4 = document.getElementById('temp-4');
let windFill4 = document.getElementById('wind-speed-4');
let humidityFill4 = document.getElementById('humidity-4');

let tempFill5 = document.getElementById('temp-5');
let windFill5 = document.getElementById('wind-speed-5');
let humidityFill5 = document.getElementById('humidity-5');

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
    for(let i = 0; i < 33; i = i + 8)
    {
        let temp = data.list[i].main.temp;
        Math.trunc(temp);
        let humidity = data.list[i].main.humidity;
        let wind = data.list[i].wind.speed;

        if(i === 0)
        {
            tempFill1.innerHTML = temp.toString();
            humidityFill1.innerHTML = humidity;
            windFill1.innerHTML = wind;
        }
        if(i === 8)
        {
            tempFill2.innerHTML = temp.toString();
            humidityFill2.innerHTML = humidity;
            windFill2.innerHTML = wind;
        }
        if(i === 16)
        {
            tempFill3.innerHTML = temp.toString();
            humidityFill3.innerHTML = humidity;
            windFill3.innerHTML = wind;
        }
        if(i === 24)
        {
            tempFill4.innerHTML = temp.toString();
            humidityFill4.innerHTML = humidity;
            windFill4.innerHTML = wind;
        }
        if(i === 32)
        {
            tempFill5.innerHTML = temp.toString();
            humidityFill5.innerHTML = humidity;
            windFill5.innerHTML = wind;
        }
    }
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