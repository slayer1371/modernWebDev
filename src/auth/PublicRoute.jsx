import Parse from "parse";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
    if (Parse.User.current()) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

export default PublicRoute;
  