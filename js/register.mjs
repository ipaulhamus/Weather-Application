import {checkDarkMode} from "./checkCookie.mjs";

let darkMode = false;
let email = '';
let zip = '';
let password = '';

document.addEventListener('DOMContentLoaded', () =>
{
    checkDarkMode();

    document.getElementById('login')
        .addEventListener('submit', (event) =>
        {
            event.preventDefault();

            zip = zip = document.getElementById('zipCode').value;
            email = document.getElementById('email').value;
            password = document.getElementById('password').value;


            if(localStorage.getItem(`${email}`) !== null)
            {
                let emailFeedback = document.getElementById('email-feedback');
                emailFeedback.classList.add('invalid');

                emailFeedback.innerHTML = 'Email Is Already Registered!';
            }
            else
            {
                let user =
                    {
                   email: email,
                   password: password,
                        zip: zip
                };

                addUser(user);
            }
        })
});

function addUser(user)
{
    localStorage.setItem(`${email}`, JSON.stringify(user));

    console.log(localStorage.getItem(`${email}`));

    window.location = "./login.html"
}