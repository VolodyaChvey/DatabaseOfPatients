import { Table } from "react-bootstrap";

export default function TableVisits({ visits, onClick }) {
    console.log(visits)
    return (
        <Table striped bordered hover className="text-center">
            <tbody>
                {visits.map((v) => (
                    <tr key={v.id} onClick={() => onClick(v)}>
                        <th>{v.created}</th>
                    </tr>
                ))}
            </tbody>

        </Table>
    )
}