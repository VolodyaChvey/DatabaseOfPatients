import { ListGroup } from "react-bootstrap";

export default function Search(){
    return (
        <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <ListGroup defaultActiveKey={'/patients'}>
                        <ListGroup.Item action href="/patients">Пациент</ListGroup.Item>
                        <ListGroup.Item action href="/diseases">Заболевание</ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}