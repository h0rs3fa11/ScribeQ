import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Profile = ({ account }) => {
  const user = useSelector((state) => state.user);

  return (
    <Card className="mb-4">
      <div className="d-flex justify-content-center mt-3">
        <Card.Img
          variant="top"
          src="https://placehold.co/20x20"
          alt="Profile Picture"
          className="img-fluid rounded-circle w-75"
        />
      </div>
      <Card.Body>
        <Card.Title>{account.id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">47 Followers</Card.Subtitle>
        <Card.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
          cupiditate possimus vel eos! Eligendi doloribus facilis vero in amet
          esse harum ad alias perspiciatis magnam? Aliquid aut consequatur
          reprehenderit labore.
        </Card.Text>
        {account.id !== user.username ? (
          <Button variant="success">Follow</Button>
        ) : (
          <Button variant="primary">Edit Profile</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Profile;
