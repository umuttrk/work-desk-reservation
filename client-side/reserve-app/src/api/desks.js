import { refreshToken } from "./user";  

//TEST
export default async function createDesk(floor_id, position_x,desk_size,position_y,rotation,owner,mail,token) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/create-desk", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'mail':mail
        },
        body: JSON.stringify({ floor_id, position_x,desk_size,position_y,rotation ,owner})
    });

    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await refreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await createDesk(floor_id, position_x,desk_size,position_y,rotation,owner,mail,accessToken): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}


//TEST
export async function updateDesk(desk_group_id,position_x,position_y,rotation,mail,token) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/update-desk", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'mail':mail
        },
        body: JSON.stringify({ desk_group_id, position_x,position_y,rotation })
    });

    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await refreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await updateDesk(desk_group_id,position_x,position_y,rotation,mail,accessToken): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

//TEST
export async function deleteDesk(desk_group_id,mail,token) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/delete-desk/"+desk_group_id, {
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
        return RefreshStatus ? await deleteDesk(desk_group_id,mail,accessToken): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

export async function getAllDesks(floor,mail,token) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/all-desks/"+floor, {
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
        return RefreshStatus ? await getAllDesks(floor,mail,accessToken): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}