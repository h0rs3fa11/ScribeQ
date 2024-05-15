import { Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import blogService from "../services/blog";
import Blogs from "../components/blogs";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const user = useSelector((state) => state.user);

  useEffect(() => {
    blogService.getTopBlogs().then(blogs => setBlogs(blogs))
  }, [])

  return (
    <Container>
      {!user.loggedIn && 
      <Container className="d-flex justify-content-md-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-md-center">
          <Col className="content text-center" md="6" lg="6">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quisquam dolorum odio eum quae sed labore ab. Ea repellat, laboriosam accusamus commodi officia cumque quia possimus adipisci consequuntur deleniti atque?</p>
          <Button as={Link} to="/login">Start Reading</Button>
          </Col>
        </Row>
      </Container>}
      {user.loggedIn && <div>
        <h2>Recommend</h2>
        <Carousel>
          {blogs.map(blog => <Carousel.Item key={blog.id}>
            <img
              className="d-block w-100"
              src="https://placehold.co/800x400"
              alt="First slide"
            />
            <Carousel.Caption as={Link} to={`/blogs/${blog.id}`}>
              <h3>{blog.title}</h3>
              {/* TODO: get username */}
              {/* <p>By {blog.author}</p> */}
            </Carousel.Caption>
          </Carousel.Item>)}
        </Carousel>

        <h2>Followed</h2>
        <Blogs />
      </div>}

    </Container>
  );
};

export default Home;
