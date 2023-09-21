import { refreshToken } from "./user";  

export default async function getFloors(token,mail) {
    const rawResponse = await fetch("http://localhost:3001/api/reservation/all-floors", {
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
        return RefreshStatus ? await getFloors(accessToken,mail): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}


//TEST
export async function createFloor(floor_number,token,mail) {
    const rawResponse = await fetch("http://localhost:3001/api/reservation/create-floor", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'mail':mail
        },
        body: JSON.stringify({ floor_number })
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await refreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await createFloor(floor_number,accessToken,mail): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}
//TEST
export async function deleteFloor(floor_number,token,mail) {
    const rawResponse = await fetch("http://localhost:3001/api/reservation/floor/" + floor_number, {
        method: 'DELETE',
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
        return RefreshStatus ? await deleteFloor(floor_number,accessToken,mail): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

