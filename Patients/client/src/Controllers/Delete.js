export default async function Delete({path}){
    await fetch(`http://localhost:8080${path}`,{
        method: 'DELETE'
    });
}