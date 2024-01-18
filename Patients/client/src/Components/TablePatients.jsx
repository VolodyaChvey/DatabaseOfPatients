import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TablePatients({ patients }) {
    const navigate = useNavigate();
    return (
        <Table striped bordered hover className="text-center">
            <thead>
                <tr>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Адрес</th>
                </tr>
            </thead>
            <tbody>
                {patients.map(p => (
                    <tr key={p.id} onClick={() => navigate(`/patients/${p.id}`)}>
                        <th>{p.lastName}</th>
                        <th>{p.firstName}</th>
                        <th>{p.middleName}</th>
                        <th>{p.address}</th>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}