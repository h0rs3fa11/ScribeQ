/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Card, Button, Col, Row } from "react-bootstrap";

const Blogs = ({ setBlog }) => {
  const blogs = setBlog ? setBlog : useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);

  return (
    <>
      {blogs.map((blog) => (
        <Card key={blog.id} className="blog-list my-3 mb-4">
          <Row className="d-flex">
            <Col md={9}>
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Repellat quia vel incidunt doloremque, dolores odit laborum
                  perferendis, vitae adipisci culpa ducimus nam, error ratione.
                  Facere eveniet eius dolorum quasi pariatur.
                </Card.Text>
                <Button variant="primary" as={Link} to={`/blogs/${blog.id}`}>
                  More
                </Button>
              </Card.Body>
            </Col>
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center p-0"
            >
              <Card.Img
                variant="top"
                src="https://placehold.co/100x100"
                alt="Post image"
                style={{ maxWidth: "40%", height: "auto" }}
              />
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};
  

export default Blogs;
