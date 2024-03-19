import Request from "./Request";

export default async function Put({ path, body }) {
  return await Request(
    fetch(`http://localhost:8080${path}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}
