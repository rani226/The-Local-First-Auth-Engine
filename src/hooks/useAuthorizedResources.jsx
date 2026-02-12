import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../data/resources";

export default function useAuthorizedResources(resources) {
  const { user } = useAuth();
  const role = user?.role ?? "Viewer";

  return useMemo(() => {
    return resources.filter((r) => ROLES[role] >= ROLES[r.minRoleRequired]);
  }, [resources, role]);
}

