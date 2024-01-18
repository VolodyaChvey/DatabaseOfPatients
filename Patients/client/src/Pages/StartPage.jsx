import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Tab} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import Addition from "./Addition";
import Search from "./Search";

export default function StartPage() {
    return (
        <Container>
            <Tab.Container defaultActiveKey="search">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column mt-2 ">
                            <Nav.Item>
                                <Nav.Link eventKey={"search"}>Искать</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mt-2">
                                <Nav.Link eventKey={"addition"}>Добавить</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="search">
                                <Search />
                            </Tab.Pane>
                            <Tab.Pane eventKey="addition">
                                <Addition />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}