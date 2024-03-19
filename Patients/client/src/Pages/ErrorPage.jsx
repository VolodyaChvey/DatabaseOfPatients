import { isRouteErrorResponse, useRouteError } from "react-router";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <header>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/patients">Patients</NavLink>
          <NavLink to="/diseases">Diseases</NavLink>
        </header>
        <h1>{error.data.statusText}</h1>
        <h2>{error.data.message}</h2>
      </div>
    );
  }
  return (
    <div>
      <h2>Something went wrong</h2>
    </div>
  );
}
