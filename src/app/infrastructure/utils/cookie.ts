export const getCookie : any = (cookieName : string) => {

    const cookies = document.cookie;
    const cookieTemp = cookies.split(';');
    let cookieTempIdx : any = null;

    cookieTemp.forEach((item, idx) => {

        if (item.indexOf(cookieName) !== -1) {
            cookieTempIdx = idx;
        }
    });

    if (cookieTempIdx !== null) {
        const cookie = cookieTemp[cookieTempIdx];
        return cookie.substring(cookieName.length + 1, cookie.length);
    }

    return '';
}

export const setCookie = (cookieName : string, value : any, expiration? : any) : void => {

    const exp = !expiration ? new Date(new Date().getTime() + (60 * 60 * 1000)) : expiration;

    console.log('COOKIE', exp, value);
    document.cookie = `${cookieName}=${value};expires=${exp}`;
}

export const deleteCookie = (cookieName : string) : void => {
    const expiration = new Date(new Date().getDate() -1 );
    document.cookie = `${cookieName}=null;expires=${expiration};path=/;`;
}