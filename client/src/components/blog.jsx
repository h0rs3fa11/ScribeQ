/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blog";
import { removeBlog } from "../reducers/blogReducer";
import { setError } from "../reducers/notificationReducer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLikes(blog.likes);
  }, [blog]);

  const updateLikes = async () => {
    try {
      setLikes(likes + 1);
      await blogService.addLikes(blog.id);
    } catch (exception) {
      dispatch(setError(`Update blog failed: ${exception}`));
      setTimeout(() => dispatch(setError("")), 5000);
    }
  };

  return (
    <Container className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      <ul>
        <li>{blog.content}</li>
        <li>
          Like <span>{likes}</span>
          <Button onClick={updateLikes} className="like-button">
            like
          </Button>
        </li>
        <li>{blog.author.name ? blog.author.name : blog.author.username}</li>
      </ul>
      {user.username === blog.author.username && (
        <Button
          variant="danger"
          onClick={() => {
            dispatch(removeBlog(blog.id))
            navigate('/')
          }
          }
          className="remove-button"
        >
          remove
        </Button>
      )}
    </Container>
  );
};

export default Blog;
