export const getCookie : any = (cookieName : string) => {

    const cookies = document.cookie;
    const cookieTemp = cookies.split(';');
    let cookieTempIdx : any = null;

    cookieTemp.forEach((item, idx) => { 
        if (item.indexOf(cookieName)) {
            cookieTempIdx = idx;
        }
    });

    if (cookieTempIdx) {
        const cookie = cookieTemp[cookieTempIdx];
        return cookie.substring(cookieName.length + 1, cookie.length);
    }

    return '';
}

export const setCookie = (cookieName : string, value : any, expiration : any) : void => {

    document.cookie = `${cookieName}=${value};expires=${expiration}`;
}

export const deleteCookie = (cookieName : string) : void => {
    const expiration = new Date(new Date().getDate() -1 );
    document.cookie = `${cookieName}=null;expires=${expiration};path=/;`;
}