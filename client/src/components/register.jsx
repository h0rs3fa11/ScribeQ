import { Container, Form, Button, FormGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import register from "../services/user";
import { setInfo, setError } from "../reducers/notificationReducer";

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const onRegister = async (event) => {
    event.preventDefault();
    try {
      const user = await register({
        username: event.target.username.value,
        password: event.target.password.value
      })
      console.log(user)
      dispatch(setInfo("Register success!"))
      setTimeout(() => {
        dispatch(setInfo(""))
        navigate("/login");
      }, 5000)
    } catch (e) {
      console.log(e)
      dispatch(setError("invalid register info"));
      setTimeout(() => dispatch(setError("")), 5000)
    }
    event.target.username.value = "";
    event.target.username.password = "";
  }

  return (
    <Container className="d-flex justify-content-md-center align-items-center">
      <Row className="w-50 justify-content-md-center mt-5">
      <h2>Register</h2>
      <Form onSubmit={onRegister}>
        <FormGroup>
          <Form.Control type="text" id="username" name="username" placeholder="username"/>
        </FormGroup>
        <FormGroup className="mb-3 mt-3">
          <Form.Control type="password" id="password" name="password" placeholder="password" />
        </FormGroup>
        <Button type="submit" className="me-2">
          submit
        </Button>
      </Form>
      </Row>
    </Container>
  )
}

export default RegisterForm;