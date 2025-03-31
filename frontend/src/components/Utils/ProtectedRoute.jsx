import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import {
  clearNotification,
  setNotification,
} from "../../Redux/Slices/notificationSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, access_token, refresh_Token } = useSelector(
    (store) => store.authentication
  );

  console.log(`isAuth: ${isAuthenticated} -> accessToken: ${access_token}`);

  if (!isAuthenticated || !access_token) {
    // alert("user not authenticated"); //show notification here later on
    dispatch(setNotification("User Not Authenticated, Please Login"));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);
    return <Navigate to={"/login"} replace></Navigate>; //return to homepage
  }

  //if authenticated, allow and render the components
  return <div>{children}</div>;
}
