import { Container, Row, Col, Nav, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Profile from "../components/profile";
import Followers from "../components/followers";

const Account = () => {
  const user = useSelector((state) => state.user);
  const user_name = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      return;
    }

    if (!user.loggedIn) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (Object.keys(user).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="w-85 mx-auto mt-5 content">
      <Row className="justify-content-center">
        <Col md={7}>
          <div className="mb-4">
            <h1 className="content">{user_name.id}</h1>
            <Nav variant="tabs" defaultActiveKey="home">
              <Nav.Item>
                <Nav.Link eventKey="home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about">About</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <PostListTmp />
        </Col>
        <Col md={3} className="mt-6">
          <Profile account={user_name} />
          <Followers />
        </Col>
      </Row>
    </Container>
  );
};

const PostListTmp = () => {
  const posts = [
    {
      title: "lore ipsum dolor sit amet",
      date: "Jan 22, 2020",
      views: 341,
      description:
        "lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate...",
      imgSrc: "https://placehold.co/40x40", // replace with actual image path
    },
    {
      title: "lore ipsum dolor sit amet",
      date: "Jan 8, 2020",
      views: 108,
      description:
        "lor em ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate...",
      imgSrc: "https://placehold.co/40x40", // replace with actual image path
    },
  ];

  return (
    <>
      {posts.map((post, index) => (
        <Card className="mb-4" key={index}>
          <Row>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Card.Subtitle className="text-muted">
                  {post.date} • {post.views} views
                </Card.Subtitle>
              </Card.Body>
            </Col>
            <Col md={4}>
              <Card.Img variant="top" src={post.imgSrc} alt="Post image" />
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default Account;
