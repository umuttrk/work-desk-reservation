import { refreshToken } from "./user";  

export default async function getBusyDates(desk_id,mail,token) {
    const rawResponse = await fetch("http://localhost:3001/api/reservation/busy-dates/" + desk_id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'mail': mail
        },
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await refreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await getBusyDates(desk_id,mail,accessToken): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}


export async function reserveDesk(desk_id, start_date, end_date, mail,reserverMail,token) {
    const rawResponse = await fetch("http://localhost:3001/api/reservation/reserve-desk", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'mail': reserverMail
        },
        body: JSON.stringify({ desk_id, start_date, end_date, mail })
    });

    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await refreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await reserveDesk(desk_id, start_date, end_date, mail,accessToken): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

export async function getMyReservations(mail, token) {
    const rawResponse = await fetch("http://localhost:3001/api/reservation/my-reservations/" + mail, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'mail': mail
        },
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await refreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await getMyReservations(mail, accessToken): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

export async function deleteMyReservation(reservation_id, mail,token) {
    const rawResponse = await fetch("http://localhost:3001/api/reservation/delete-my-reservation/" + reservation_id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'mail': mail
        },
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await refreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await deleteMyReservation(reservation_id, mail,accessToken): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

export async function filterReservations(floor, start_date, end_date,mail,token) {
    const rawResponse = await fetch("http://localhost:3001/api/reservation/filter-desks/" + floor + "?startDate=" + start_date + "&endDate=" + end_date,
     {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'mail': mail
        },
    });

    
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await refreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await filterReservations(floor, start_date, end_date,mail,accessToken): { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}