/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../reducers/notificationReducer";
import loginService from "../services/login";
import blogService from "../services/blog";
import { setCurrentUser } from "../reducers/userReducer";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, FormGroup, Row } from "react-bootstrap";
import { localStorageContext } from "../main";
import { useContext, useEffect } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const localStorageKey = useContext(localStorageContext);
  const curUser = useSelector((state) => state.user);
  // const notify = useSelector(state => state.notify)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("<Login> Current user:", curUser);
  });

  const useLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      });
      window.localStorage.setItem(localStorageKey, JSON.stringify(user));
      dispatch(setCurrentUser(user));
      blogService.setToken(user.token);
      navigate("/");
    } catch (exception) {
      console.log("wrong credentials");
      // setErrorMessage('wrong credentials')
      dispatch(setError("wrong credentials"));

      setTimeout(() => dispatch(setError("")), 5000);
    }
    event.target.username.value = "";
    event.target.username.password = "";
  };

  return (
    <Container className="d-flex justify-content-md-center align-items-center">
      {!curUser.loggedIn && (
        <Row className="w-50 justify-content-md-center mt-5">
          <h2>Login</h2>
          <Form onSubmit={useLogin}>
            <FormGroup>
              {/* <Form.Label>username</Form.Label> */}
              <Form.Control
                type="text"
                id="username"
                name="username"
                placeholder="username"
              />
            </FormGroup>
            <FormGroup className="mb-3 mt-3">
              {/* <Form.Label>password</Form.Label> */}
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="password"
              />
            </FormGroup>
            <Button
              className="button-spacing me-2"
              type="submit"
              id="login-button"
            >
              login
            </Button>
            <Button as={Link} to="/register">
              register
            </Button>
          </Form>
          {/* </Togglable> */}
        </Row>
      )}
      {curUser.loggedIn && navigate("/account")}
    </Container>
  );
};

export default LoginForm;
