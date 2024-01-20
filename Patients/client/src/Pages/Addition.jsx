import { ListGroup } from "react-bootstrap";

export default function Addition() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <ListGroup defaultActiveKey={'#link1'}>
                        <ListGroup.Item action href="patients/new">Пациент</ListGroup.Item>
                        <ListGroup.Item action href="#link2">Анализы</ListGroup.Item>
                        <ListGroup.Item action href="#link3">Осмотр</ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}