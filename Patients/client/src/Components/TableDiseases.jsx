import { Table } from "react-bootstrap";

export default function TableDiseases({ diseases, onClick }) {
  return (
    <Table striped bordered hover className="text-center">
      <tbody>
        {diseases.map((d) => (
          <tr key={d.id} onClick={() => onClick(d)}>
            {d?.code && <th>{d?.code}</th>}
            <th>{d.name}</th>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
