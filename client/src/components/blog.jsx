/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blog";
import { removeBlog } from "../reducers/blogReducer";
import { setError } from "../reducers/notificationReducer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faHeart } from '@fortawesome/free-solid-svg-icons';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  const { id } = useParams()
  const [likes, setLikes] = useState(0);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!content && id) {
        try {
          const resp = await blogService.getOne(id);
          setContent(resp);
          setLikes(resp.likes);
        } catch (err) {
          console.error('Error fetching blog:', err);
          navigate('/');
        }
      } else {
        setLikes(content.likes);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const updateLikes = async () => {
    try {
      setLikes(likes + 1);
      await blogService.addLikes(blog.id);
    } catch (exception) {
      dispatch(setError(`Update blog failed: ${exception}`));
      setTimeout(() => dispatch(setError("")), 5000);
    }
  };

  if (!blog) {
    return <div>Loading...</div>
  }

  return (
    <Container className="mt5">
      <Row className="justify-content-md-center">
        <Col className="text-center">
          <h1 className="title">{blog.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          {blog.author.name ? blog.author.name : blog.author.username}
        </Col>
      </Row>

      <Row className="mt-3 justify-content-md-center">
        {user.username !== blog.author.username &&
        <Col xs lg="1" className="text-center">
          <Link onClick={updateLikes} className="like-button">
            <FontAwesomeIcon className="pe-2" icon={faHeart} title="Create a New Blog" />
            <span>{likes}</span>
          </Link>
        </Col>
        }
        {user.username === blog.author.username &&
          <>
            <Col xs lg="1" className="d-flex justify-content-end align-items-center">
              <Link onClick={updateLikes} className="like-button">
                <FontAwesomeIcon className="pe-2" icon={faHeart} title="Create a New Blog" />
                <span>{likes}</span>
              </Link>
            </Col>
            <Col xs lg="1">
              <Link onClick={async () => {
                // TODO: alert
                await dispatch(removeBlog(blog.id))
                navigate('/')
              }} className="remove-button">
                <FontAwesomeIcon icon={faTrashCan} title="Delete this" />
              </Link>
            </Col>
          </>
        }
      </Row>

      <Row>
        <Col className="mt-3 text-center content">
          {blog.content}
        </Col>
      </Row>


    </Container>
  );
};

export default Blog;
