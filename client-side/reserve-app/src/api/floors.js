export default async function getFloors() {
    const rawResponse = await fetch("http://localhost:3001/api/reservation/get-all-floors", {
        method: 'POST',
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
    const rawResponse = await fetch("http://localhost:3001/api/reservation/create-floor", {
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
