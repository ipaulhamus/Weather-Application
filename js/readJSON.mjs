export { readZip, readEmail, readPassword, readCookieZip, readCookieEmail, readCookieMode };


function readEmail(json)
{
    let userData = JSON.parse(json);
    console.log(`User Email: ${userData.email}`);
    return userData.email;
}

function readPassword(json)
{
    let userData = JSON.parse(json);
    return userData.password;
}

function readZip(json)
{
    let userData = JSON.parse(json);
    return userData.zip;
}

function readCookieZip()
{
    const returnValue = document.cookie.split('; ')
        .find((row) => row.toLowerCase().startsWith('zip' + '=')) ?.split('=')[1];

    console.log(returnValue);
    return returnValue;
}

function readCookieEmail()
{
    const returnValue = document.cookie.split('; ')
        .find((row) => row.toLowerCase().startsWith('email' + '=')) ?.split('=')[1];

    console.log(returnValue);
    return returnValue;
}

function readCookieMode()
{
    const returnValue = document.cookie.split('; ')
        .find((row) => row.toLowerCase().startsWith('mode' + '=')) ?.split('=')[1];

    console.log('Screen Mode: ' + returnValue);
    return returnValue;
}