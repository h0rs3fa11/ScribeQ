import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Account = () => {
  const user = useSelector((state) => state.user);
  const user_name = useParams();
  const [showForm, setShowForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);

    setOldPassword("");
    setNewPassword("");
    setShowForm(false);
  };

  if (user.username !== user_name.id) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
        <Row className="w-75 justify-content-center">
          <Col className="text-center mb-4">
            <h2 className="display-4">Account</h2>
            <p className="lead">You are viewing {user_name.id} page</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
      <Row className="w-75 justify-content-center">
        <Col className="text-center mb-4">
          <h1 className="display-4">Account</h1>
          <p className="lead">Manage your account settings</p>
        </Col>
      </Row>
      <Row className="w-75 justify-content-center">
        <Col className="text-center">
          <Button onClick={() => setShowForm(!showForm)} className="mb-3">
            {showForm ? "Cancel" : "Edit Password"}
          </Button>
        </Col>
      </Row>
      {showForm && (
        <Row className="w-75 justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formOldPassword">
                <Form.Control
                  type="password"
                  value={oldPassword}
                  placeholder="old password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formNewPassword" className="mb-3 mt-3">
                <Form.Control
                  type="password"
                  value={newPassword}
                  placeholder="new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Account;
