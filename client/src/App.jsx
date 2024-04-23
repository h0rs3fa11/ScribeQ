import { createContext, useEffect } from "react";
import Blogs from "./components/blogs";
import Blog from "./components/blog";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import BlogForm from "./components/blogForm";
import Home from "./components/home";
import Account from "./components/account";
import { updateAll } from "./reducers/blogReducer";
import { createBlog } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducers/userReducer";
import blogService from "./services/blog";
import { Alert } from "react-bootstrap";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { localStorageContext } from "./main";

function App() {
  const localStorageKey = "loggedBlogUser";
  const curUser = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blog);
  const notify = useSelector((state) => state.notify);
  const dispatch = useDispatch();

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

  const padding = {
    padding: 5,
  };

  return (
    <localStorageContext.Provider value={localStorageKey}>
      <div className="container">
        {notify.info && <Alert variant={notify.type}>{notify.info}</Alert>}
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/blogs">
                  Blogs
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {curUser.loggedIn ? (
                  <Link style={padding} to="/account">
                    Account
                  </Link>
                ) : (
                  <Link style={padding} to="/login">
                    Login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/account"
            element={
              curUser.loggedIn ? <Account /> : <Navigate replace to="/login" />
            }
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          <Route
            path="/blogs/:id/edit"
            element={<BlogForm createBlog={createBlog} />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </localStorageContext.Provider>
  );
}

export default App;
