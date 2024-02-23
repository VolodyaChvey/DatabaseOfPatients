import { useEffect } from "react";
import { Row } from "react-bootstrap";

export default function TextTimeout({ text, setText }) {
    useEffect(() => {
        let timeout = setTimeout(setText, 2000, "")
        return () => clearTimeout(timeout)
    })
    return (
        <Row className="mb-3 text-center">
            <div style={{ color: "red" }}>{text}</div>
        </Row>
    )

}