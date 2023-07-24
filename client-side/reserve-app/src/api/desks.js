export default async function createDesk(floor_id, position_x,desk_size,position_y,rotation,owner) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/create-desk", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           // 'token': token
        },
        body: JSON.stringify({ floor_id, position_x,desk_size,position_y,rotation ,owner})
    });

    const content = await rawResponse.json();
   return content;
}



export async function updateDesk(desk_group_id,position_x,position_y,rotation) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/update-desk", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           // 'token': token
        },
        body: JSON.stringify({ desk_group_id, position_x,position_y,rotation })
    });

    const content = await rawResponse.json();
   return content;
}
export async function deleteDesk(desk_group_id) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/delete-desk", {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           // 'token': token
        },
        body: JSON.stringify({ desk_group_id })
    });

    const content = await rawResponse.json();
   return content;
}

export async function getAllDesks(floor) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/get-all-desks", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           // 'token': token
        },
        body: JSON.stringify({floor })
    });

    const content = await rawResponse.json();
   return content;
}