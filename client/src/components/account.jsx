import { Container, Row, Col, Nav, Card, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Profile from "../components/profile";
import Followers from "../components/followers";
import Blogs from "../components/blogs";
import blogService from "../services/blog";

const Account = () => {
  const user = useSelector((state) => state.user);
  const [userBlog, setUserBlog] = useState([]);
  const user_name = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch blogs for logged-in user
    const fetchAccountBlogs = async () => {
      try {
        const blogs = await blogService.getAll(user.id);
        console.log(blogs);
        setUserBlog(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    if (Object.keys(user).length === 0) {
      return;
    }

    if (!user.loggedIn) {
      navigate("/login");
    } else {
      fetchAccountBlogs();
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
            <Tab.Container defaultActiveKey="home">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="about">About</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="home">
                  <Blogs setBlog={userBlog} />
                </Tab.Pane>
                <Tab.Pane eventKey="about" className="content">
                  <p>This is the content displayed when "About" is active.</p>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Col>
        <Col md={3} className="mt-6">
          <Profile account={user_name} />
          <Followers />
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
