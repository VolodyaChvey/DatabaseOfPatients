import { Tab, Tabs } from "react-bootstrap";
import NewDiagnosis from "../NewDiagnosis";

export default function TabsAddPatient() {
    return (
        <Tabs defaultActiveKey="1" className="mb-3" justify>
            <Tab eventKey="1" title="Диагноз">
                <NewDiagnosis />
            </Tab>
        </Tabs>
    )
}