/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setError, setInfo } from "../reducers/notificationReducer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getOne from "../services/blog";
import { Container, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blogObj = {
      _id: params.id,
      title: title,
      content: text,
    };

    try {
      const blog = await dispatch(createBlog(blogObj));
      console.log(blog);
      dispatch(setInfo("Create blog success"));
      setTimeout(() => dispatch(setInfo("")), 5000);
      // navigate('/')
      navigate(`/blogs/${params.id}`, {blog: blog});
    } catch (exception) {
      dispatch(setError(`Create blog failed: ${exception}`));
      setTimeout(() => dispatch(setError("")), 5000);
    }
  };

  return (
    <Container className="mt-5">
      <Form>
        <Row className="justify-content-md-center">
          <Col xs={10} md={8}>
            <InputGroup className="no-border">
              <Form.Control
                placeholder="Title"
                className="title"
                onChange={handleTitleChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-2 justify-content-md-center">
          <Col xs={10} md={8}>
            <InputGroup className="no-border">
              <Form.Control
                className="content"
                as="textarea"
                placeholder="Share your thoughts"
                value={text}
                onChange={handleChange}
                style={{ height: 'auto' }}
                rows={Math.max(1, text.split('\n').length || 1)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-5 justify-content-md-center">
          <Col xs={10} md={8}>
          <Button variant="primary" type="submit" onClick={handleCreateBlog}>Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default BlogForm;
