/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setError, setInfo } from "../reducers/notificationReducer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, FormGroup } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blogObj = {
      _id: params.id,
      title: event.target.title.value,
      content: event.target.content.value,
    };

    event.target.title.value = "";
    event.target.content.value = "";

    try {
      dispatch(createBlog(blogObj));
      dispatch(setInfo("Create blog success"));
      setTimeout(() => dispatch(setInfo("")), 5000);
      navigate("/");
    } catch (exception) {
      dispatch(setError(`Create blog failed: ${exception}`));
      setTimeout(() => dispatch(setError("")), 5000);
    }
  };

  return (
    <Container>
      <h2>Create a Blog</h2>
      <Form onSubmit={handleCreateBlog} className="create-form">
        <FormGroup>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="input title..."
            id="blog-title"
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>content</Form.Label>
          <Form.Control
            type="text"
            name="content"
            placeholder="input content..."
            id="blog-content"
          />
        </FormGroup>
        <Button variant="primary" type="submit" id="create-blog-button">
          create
        </Button>
      </Form>
    </Container>
  );
};

export default BlogForm;
