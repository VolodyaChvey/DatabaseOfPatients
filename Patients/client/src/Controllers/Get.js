import Request from "./Request";

export default async function Get({ path }) {
  return await Request(fetch(`http://localhost:8080${path}`));
}
