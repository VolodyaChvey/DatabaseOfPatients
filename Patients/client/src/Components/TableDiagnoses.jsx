
import { Table } from "react-bootstrap";

export default function TableDiagnoses({ diagnoses, onClick }) {
  console.log(diagnoses)
  return (
    <Table striped bordered hover className="text-center">
      <tbody>
        {diagnoses.map(d => (
          <tr key={d.id} onClick={() => onClick(d.id)}>
            <th>{d.id}</th>
            <th>{d.mainDisease?.name}</th>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
