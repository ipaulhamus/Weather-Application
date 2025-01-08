import { readZip, readPassword, readEmail } from "./readJSON.mjs";
import { checkDarkMode } from "./checkCookie.mjs";

let emailInput = '';
let passwordInput = '';

document.addEventListener('DOMContentLoaded', () =>
{
    checkDarkMode();

    document.getElementById('login')
        .addEventListener('submit', (event) =>
        {
            event.preventDefault();
            emailInput = document.getElementById('email').value;
            passwordInput = document.getElementById('password').value;

            let info = localStorage.getItem(`${emailInput}`);
            let emailFeedback = document.getElementById('email-feedback');
            let passwordFeedback = document.getElementById('password-feedback');

            if(info === null)
            {
                emailFeedback.classList.add('invalid');

                emailFeedback.innerHTML = 'Email Not Found!';
            }
            else if(info)
            {
                emailFeedback.innerHTML = ' ';

                console.log(readPassword(info));
                console.log(passwordInput);

                if(passwordInput === readPassword(info))
                {
                    document.cookie = `email=${readEmail(info)};`;
                    document.cookie = `zip=${readZip(info)};`;

                    console.log(document.cookie);
                    window.location = './currentWeather.html';
                }
                else
                {
                    passwordFeedback.classList.add('invalid');

                    passwordFeedback.innerHTML = 'Password is incorrect!';
                }
            }
        });
});

