import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ItemDisease from './ItemDisease';

export default function TabsDiseases({ diseases, onApply }) {
  return (
    <>
      <Tabs defaultActiveKey="main"
        id="fill-tab-example"
        className="mb-3"
        justify>
        {Object.entries(diseases).map(([n, m]) => (
          <Tab key={n} eventKey={n} title={n}>
            <ItemDisease itemDisease={m} name={n} onApply={onApply} />
          </Tab>
        ))}
      </Tabs>
    </>
  );
}