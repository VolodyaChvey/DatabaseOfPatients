import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import TablePatients from "../Components/TablePatients";

function Patients() {
    const { patients } = useLoaderData();
    return (
        <>
            <h2 className="m-3">Список пациентов</h2>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={patients}>
                    <TablePatients patients={patients} />
                </Await>
            </Suspense>
        </>
    )
}

async function getPatients() {

    try {
        const res = await fetch(`http://localhost:8080/patients`)
        return res.json();
    }
    catch (e) {
        return ([{ id: 101, lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', address: 'Иванова 34' },
        { id: 102, lastName: 'Петров', firstName: 'Петр', middleName: 'Петрович', address: 'Ленинская 12' }])
    }

}

async function patientsLoader() {
    const patients = await getPatients();
    if (!patients.length) {
        /* throw  ({ message: 'Not Found!', reason: "Wrong url" }, { status: 404 })*/
    }
    return ({ patients })
}

export { Patients, patientsLoader }