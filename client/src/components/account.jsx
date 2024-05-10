import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Account = () => {
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <h1>Account {user.username}</h1>
    </Container>
  );
};

export default Account;
