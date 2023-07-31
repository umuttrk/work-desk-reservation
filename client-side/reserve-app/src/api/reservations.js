export default async function getBusyDates(desk_id) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/busy-dates/"+desk_id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'token': token
        },
        // body: JSON.stringify({desk_id})
    });

    const content = await rawResponse.json();
    return content;
}


export async function reserveDesk(desk_id,start_date,end_date,mail) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/reserve-desk", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'token': token
        },
        body: JSON.stringify({desk_id,start_date,end_date,mail})
    });

    const content = await rawResponse.json();
    return content;
}
export async function getMyReservations(mail) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/my-reservations/"+mail, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'token': token
        },
    });
    const content = await rawResponse.json();
    return content;
}

export async function deleteMyReservation(reservation_id) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/delete-my-reservation/"+reservation_id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'token': token
        },
    });
    const content = await rawResponse.json();
    return content;
}

export async function filterReservations(floor,start_date,end_date) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/filter-desks/"+floor+"?startDate="+start_date+"&endDate="+end_date, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'token': token
        },
    });
    const content = await rawResponse.json();
    return content;
}