import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export default function PageHeader(prop) {
    return (
        <Container>
            <Card className="bg-light">
                <Card.Body>{prop.text}</Card.Body>
            </Card>
            <br />
        </Container>
    );
}
