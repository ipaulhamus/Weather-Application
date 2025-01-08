import { readCookieEmail, readCookieMode } from "./readJSON.mjs";

export { checkCookie, checkDarkMode };

function checkCookie()
{
    const check = readCookieEmail();

    return check !== undefined;
}

function checkDarkMode()
{
    const check = readCookieMode();

    if(check === 'dark')
    {
        document.querySelector('html')
            .setAttribute('data-bs-theme', 'dark');
    }
    else
    {
        document.querySelector('html')
            .setAttribute('data-bs-theme', 'light');
    }
}