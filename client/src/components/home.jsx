import Carousel from 'react-bootstrap/Carousel';
import blogService from "../services/blog";
import { useEffect, useState } from 'react';

const Home = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getTopBlogs().then(blogs => setBlogs(blogs))
  }, [])

  return (
    <div>
      <h1>ScribeQ</h1>
      <h2>Recommend</h2>
      <Carousel>
        {blogs.map(blog => <Carousel.Item key={blog.id}>
          <img
            className="d-block w-100"
            src="https://placehold.co/800x400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{blog.title}</h3>
            {/* TODO: get username */}
            {/* <p>By {blog.author}</p> */}
          </Carousel.Caption>
        </Carousel.Item>)}
      </Carousel>
    </div>
  );
};

export default Home;
