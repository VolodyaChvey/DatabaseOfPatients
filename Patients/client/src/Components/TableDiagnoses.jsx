import { Table } from "react-bootstrap";

export default function TableDiagnoses({arrText,onClick}){
    console.log(arrText)
return (
    <Table striped bordered hover className="text-center">
        <tbody>
            {arrText.map(t=>(
                <tr key={t}>
                    <th onClick={()=>onClick(t)}>{t}</th>
                </tr>
            ))}
        </tbody>
    </Table>
)
}