import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, access_token, refresh_Token } = useSelector(
    (store) => store.authentication
  );

  console.log(`isAuth: ${isAuthenticated} -> accessToken: ${access_token}`);

  if (!isAuthenticated || !access_token) {
    alert("user not authenticated"); //show notification here later on
    return <Navigate to={"/login"} replace></Navigate>; //return to homepage
  }

  //if authenticated, allow and render the components
  return <div>{children}</div>;
}
