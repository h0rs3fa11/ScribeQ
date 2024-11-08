import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";

const MiniProfile = ({ account }) => {
  return (
    <Container>
      <Card className="border-0">
        <Card.Body>
          <Row>
            <Col xs="auto">
              <Card.Img
                variant="top"
                src="https://placehold.co/20x20"
                alt="Profile Picture"
                className="img-fluid rounded-circle w-75"
              />
            </Col>
            <Col>
              <Card.Text className="mb-0">
                <strong>Daniel Wu</strong>
              </Card.Text>
              <Button variant="link" className="p-0 text-success">
                Follow
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MiniProfile;
