import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   return token
//     ? children
//     : <Navigate to="/" />;
// }


function ProtectedRoute({
  children,
  roles
}) {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (
    roles &&
    !roles.includes(user.role)
  ) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
