export default async function Put({path,body}){
    const response = await fetch(`http://localhost:8080${path}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
return response.json();
}