import { Container, Carousel } from 'react-bootstrap';
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
      {!user.loggedIn && <div>log in first</div>}
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
