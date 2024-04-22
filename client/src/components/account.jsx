import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearLoggedUser } from "../reducers/userReducer";
import { useContext } from "react";
import { localStorageContext } from "../main";

const Account = () => {
  const navigate = useNavigate();
  const localStorageKey = useContext(localStorageContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const useLogout = async () => {
    window.localStorage.removeItem(localStorageKey);
    console.log("remove logged");
    dispatch(clearLoggedUser());
    navigate("/");
  };

  return (
    <div>
      <h1>Account {user.username}</h1>
      <Button onClick={useLogout}>log out</Button>
    </div>
  );
};

export default Account;
