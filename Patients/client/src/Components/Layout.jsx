import {NavLink, Outlet} from "react-router-dom";

export default function Layout(){
    return (
        <>
        <header>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/patients">Patients</NavLink>
            <NavLink>Diseases</NavLink>
        </header>
        <main className="container">
            <Outlet/>
        </main>
        <footer className="container"></footer>
        </>
    )
}