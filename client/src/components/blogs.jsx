/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const Blogs = () => {
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);

  return (
    <Container>
      {blogs.map((blog) => (
        <Card key={blog.id} className="blog-list row my-3">
          {/* <Card.Img variant="top" src="https://picsum.photos/50" /> */}
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia vel incidunt doloremque, dolores odit laborum perferendis, vitae adipisci culpa ducimus nam, error ratione. Facere eveniet eius dolorum quasi pariatur.
            </Card.Text>
            <Button variant="primary" as={Link} to={`/blogs/${blog.id}`}>More</Button>
          </Card.Body>
        </Card>
      ))}
      )
    </Container>
  );
};

export default Blogs;
