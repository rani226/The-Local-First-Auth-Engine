
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { resourcesSeed, ROLES } from "../data/resources";
import { useAuth } from "../context/AuthContext";

export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const resource = useMemo(() => resourcesSeed.find((r) => r.id === id), [id]);

  // Intercept if user lacks required role for THIS resource
  useEffect(() => {
    if (!resource || !user) return;
    const allowed = ROLES[user.role] >= ROLES[resource.minRoleRequired];
    if (!allowed) navigate("/not-authorized", { replace: true });
  }, [resource, user, navigate]);

  if (!resource) return <p>Resource not found.</p>;

  return (
    <div>
      <h1>{resource.name}</h1>
      <p>ID: {resource.id}</p>
      <p>Requires: {resource.minRoleRequired}</p>
      <p>Status: {resource.status.state}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
