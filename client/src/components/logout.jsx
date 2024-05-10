import { useNavigate } from "react-router-dom";
import { clearLoggedUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { localStorageContext } from "../main";
import { Container } from "react-bootstrap"

const Logout = () => {
  const navigate = useNavigate();
  const localStorageKey = useContext(localStorageContext);
  const dispatch = useDispatch();

  const useLogout = async () => {
    window.localStorage.removeItem(localStorageKey);
    console.log("remove logged");
    dispatch(clearLoggedUser());
    navigate("/");
  };

  return (
    <Container>
      <form onSubmit={useLogout}>
        <button type="submit" onClick>
          logout
        </button>
      </form>
    </Container>
  );
};

export default Logout;
