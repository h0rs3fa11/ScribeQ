import { Form, Button, FormGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import register from "../services/user";
import { setError } from "../reducers/notificationReducer";

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
      navigate("/login");
    } catch (e) {
      console.log(e)
      dispatch(setError("invalid register info"));
      setTimeout(() => dispatch(setError("")), 5000);
    }
    event.target.username.value = "";
    event.target.username.password = "";
  }

  return (
    <div>
      <Form onSubmit={onRegister}>
        <FormGroup>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" id="username" name="username" />
        </FormGroup>
        <FormGroup>
          <Form.Label>password</Form.Label>
          <Form.Control type="password" id="password" name="password" />
        </FormGroup>
        <Button type="submit">
          register
        </Button>
      </Form>
    </div>
  )
}

export default RegisterForm;