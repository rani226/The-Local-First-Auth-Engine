import { useAuth } from "../context/AuthContext";
import { ROLES } from "../data/resources";

export default function IfAuthorized({ requiredRole = "Viewer", children }) {
  const { user } = useAuth();
  if (!user) return null;
  if (ROLES[user.role] < ROLES[requiredRole]) return null;
  return children;
}
