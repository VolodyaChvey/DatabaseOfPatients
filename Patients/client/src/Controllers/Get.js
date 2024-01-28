export default async function Get({path}){
const response = await fetch(`http://localhost:8080${path}`);
return response.json()
}