import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../data/resources";

export default function ProtectedRoute({ children, requiredRole = "Viewer" }) {
  const { user, isAuthed, initializing } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    if (initializing) return;

    
    if (!isAuthed) {
      navigate("/login", { replace: true, state: { from: location.pathname } });
      return;
    }

    
    const userRoleValue = ROLES[user.role];
    const requiredRoleValue = ROLES[requiredRole];

    if (userRoleValue < requiredRoleValue) {
      navigate("/not-authorized", { replace: true });
    }
  }, [initializing, isAuthed, user, requiredRole, navigate, location.pathname]);

  if (initializing) return null;
  return isAuthed ? children : null;
}

