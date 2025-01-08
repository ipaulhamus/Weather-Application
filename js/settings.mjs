import { checkCookie, checkDarkMode } from "./checkCookie.mjs";
import {readCookieZip, readPassword, readCookieEmail} from "./readJSON.mjs";

document.addEventListener('DOMContentLoaded', () =>
{
    if(checkCookie() === false)
    {
        window.location = './login.html';
        window.alert('Please log in before accessing our services!');
    }
    else
    {
        checkDarkMode();

        document.getElementById('zip-edit-form')
            .addEventListener('submit', (event) =>
            {
                event.preventDefault();

                const zip = document.getElementById('zipCode').value;
                let zipFeedback = document.getElementById('zipCode-feedback');

                if(zip.toString() === readCookieZip(document.cookie))
                {
                    zipFeedback.classList.add('invalid');

                    zipFeedback.innerHTML = 'Identical to Previous ZIP Address!';
                }
                else
                {
                    document.cookie = `zip=${zip};`;

                    const currentEmail = readCookieEmail();
                    const currentZip = readCookieZip();

                    const userJson = localStorage.getItem(`${currentEmail}`);

                    const currentPass = readPassword(userJson);

                    let user =
                        {
                            email: currentEmail,
                            password: currentPass,
                            zip: currentZip
                        };

                    localStorage.setItem(`${currentEmail}`, JSON.stringify(user));

                    zipFeedback.classList.remove('invalid');
                    zipFeedback.classList.add('valid');
                    zipFeedback.innerHTML = 'ZIP Code Successfully Updated!'
                }
            });

        document.getElementById('dark-mode-button')
            .addEventListener('click', () =>
        {
            document.cookie = `mode=dark;`;
            window.location.reload();
        });

        document.getElementById('light-mode-button')
            .addEventListener('click', () =>
            {
                document.cookie = `mode=light;`;
                window.location.reload();
            });
    }
});