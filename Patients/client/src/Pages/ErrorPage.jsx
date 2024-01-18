import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorPage() {
    const error = useRouteError();
    if(isRouteErrorResponse(error)){
        return (
            <div>
                <h1>{error.status}</h1>
                <h2>{error.data.message}</h2>
                <h3>{error.data.reason}</h3>
            </div>
        )
    }
    return (
        <div>
            <h2>Something went wrong</h2>
        </div>
    )
}