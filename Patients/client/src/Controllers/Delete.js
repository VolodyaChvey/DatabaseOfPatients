import Request from "./Request";

export default async function Delete({ path }) {
  Request(
    fetch(`http://localhost:8080${path}`, {
      method: "DELETE",
    })
  );
}
