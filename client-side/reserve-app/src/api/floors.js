export default async function getFloors() {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/all-floors", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           // 'token': token
        },
        //body: JSON.stringify({ username, receiverUsername })
    });

    const content = await rawResponse.json();
   return content;
}
export async function createFloor(floor_number) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/create-floor", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           // 'token': token
        },
        body: JSON.stringify({ floor_number })
    });
// 
    const content = await rawResponse.json();
   return content;
}
export async function deleteFloor(floor_number) {
    const rawResponse = await fetch("http://192.168.1.113:3001/api/reservation/floor/"+floor_number, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           // 'token': token
        },
    });
// 
    const content = await rawResponse.json();
   return content;
}

