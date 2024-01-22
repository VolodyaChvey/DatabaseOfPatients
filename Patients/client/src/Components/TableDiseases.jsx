import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

export default function TableDiseases({ diseases }) {
  
  const navigate = useNavigate();
  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>Название заболевания</th>
        </tr>
      </thead>
      <tbody>
        {diseases.map(d => (
          <tr key={d.id} onClick={() => navigate(`/diseases/${d.id}`)}>
            <th>{d.name}</th>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
