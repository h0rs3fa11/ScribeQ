import { useEffect } from "react";
import Blogs from "./components/blogs";
import Blog from "./components/blog";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import BlogForm from "./components/blogForm";
import Home from "./components/home";
import Account from "./components/account";
import Search from "./components/search";
import SearchResult from "./components/searchResult";
import { clearLoggedUser } from "./reducers/userReducer";
import { updateAll } from "./reducers/blogReducer";
import { createBlog } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducers/userReducer";
import blogService from "./services/blog";
import { Alert, Container } from "react-bootstrap";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import { Navbar, Nav, Form, Col, Row, Button, Dropdown } from "react-bootstrap";
import { localStorageContext } from "./main";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignIn, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { generateId } from "./utils/helper";
import './assets/css/app.css'

function App() {
  const localStorageKey = "loggedBlogUser";
  const curUser = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blog);
  const notify = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogId = generateId();

  useEffect(() => {
    dispatch(updateAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem(localStorageKey);
    if (loggedUser) {
      const curUser = JSON.parse(loggedUser);
      dispatch(setCurrentUser(curUser));
      blogService.setToken(curUser.token);
    }
  }, []);

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  const useLogout = async () => {
    window.localStorage.removeItem(localStorageKey);
    console.log("remove logged");
    dispatch(clearLoggedUser());
    navigate("/");
  };

  return (
    <localStorageContext.Provider value={localStorageKey}>
      <Container>
        {notify.info && <Alert variant={notify.type}>{notify.info}</Alert>}
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="/" id="website-title">
            ScribeQ
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {curUser.loggedIn && <Search />}
            <Nav className="ms-auto">
              {curUser.loggedIn ? (
                <div className="icon-dropdown-group">
                  <Link to={`/blogs/${blogId}/edit`} state={{ blogId: blogId }}>
                    <FontAwesomeIcon
                      className="fa-pen-to-square"
                      icon={faPenToSquare}
                      title="Create a New Blog"
                    />
                  </Link>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <FontAwesomeIcon icon={faUser} title="Account" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to={`/account/${curUser.username}`}
                      >
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={useLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FontAwesomeIcon icon={faSignIn} title="Sign In" />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/account/:id" element={<Account />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          <Route
            path="/blogs/:id/edit"
            element={<BlogForm createBlog={createBlog} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/searchResults" element={<SearchResult />} />
        </Routes>
      </Container>
    </localStorageContext.Provider>
  );
}

export default App;
