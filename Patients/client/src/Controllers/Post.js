export default async function Post({path,body}){
    const response = await fetch(`http://localhost:8080${path}`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
return response.json();
}