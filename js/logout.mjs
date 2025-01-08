import {checkCookie, checkDarkMode } from "./checkCookie.mjs";

const epoc = 'Thu, 01 Jan 1970 00:00:00:00 EMT';

document.addEventListener('DOMContentLoaded', () =>
{
    checkDarkMode();

    if(checkCookie() === false)
    {
        window.location = './login.html';
        window.alert('Please log in before accessing our services!');
    }
    else
    {
        document.getElementById('log-out-button')
            .addEventListener('click', () =>
            {
               document.cookie = `email=; expires=${epoc};`;
                document.cookie = `zip=; expires=${epoc};`;
                window.location = './login.html';
            });
    }
});


