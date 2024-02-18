import { Tab, Tabs } from "react-bootstrap";
import PassportDetails from "./PassportDetails";
import DiagnosisDetails from "./DiagnosisDetails";
import VisitsDetails from "./VisitsDetails";

export default function TabsSinglePatient() {
  return (
    <Tabs defaultActiveKey="1" id="fill-tab-example" className="mb-3" justify>
      <Tab eventKey="1" title="Паспортные данные">
        <PassportDetails />
      </Tab>
      <Tab eventKey="2" title="Диагноз">
        <DiagnosisDetails />
      </Tab>
      <Tab eventKey="3" title="Осмотры">
        <VisitsDetails />
      </Tab>
    </Tabs>
  );
}
