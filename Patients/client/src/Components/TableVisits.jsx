import { Table } from "react-bootstrap";

export default function TableVisits({ visits, onClick }) {
    return (
        <Table striped bordered hover className="text-center">
            <tbody>
                {visits.map((v) => (
                    <tr key={v.id} onClick={() => onClick(v)}>
                        <th>{(new Date(v.created)).toLocaleDateString()}</th>
                    </tr>
                ))}
            </tbody>

        </Table>
    )
}