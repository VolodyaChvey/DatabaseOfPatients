import { ListGroup } from "react-bootstrap";

export default function Search(){
    return (
        <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <ListGroup defaultActiveKey={'#link1'}>
                        <ListGroup.Item action href="#link1">Пациент</ListGroup.Item>
                        <ListGroup.Item action href="#link2">Заболевание</ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}