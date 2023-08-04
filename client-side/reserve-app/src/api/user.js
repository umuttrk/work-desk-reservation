
export default async function login(mail,password) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/user/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({mail,password})
    });

    const content = await rawResponse.json();
   return content;
}
export async function credentials(token,mail) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/user/credentials/"+mail, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'mail':mail
        },
    });

    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await refreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await credentials(accessToken,mail): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }}
export async function register(name,mail,password) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/user/register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,mail,password})
    });

    const content = await rawResponse.json();
   return content;
}
export async function logout(token) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/user/logout", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({refreshToken:token})
    });

    const content = await rawResponse.json();
   return content;
}
export async function refreshToken() {
    var token = localStorage.getItem("refreshToken");
    console.log("tokekekeokeoken   "+token)
    const rawResponse = await fetch("http://192.168.1.113:3001/api/user/refreshtoken", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({refreshToken:token})
    });

    const content = await rawResponse.json();
    console.log(content)
    if(rawResponse.status === 200){
        localStorage.setItem("accessToken",content.accessToken)
        localStorage.setItem("refreshToken",content.refreshToken)
        return true;
    }else{
        return false
    }
}
