import { ROLES } from "../data/resources";

export default function ResourceItem({
  resource,
  userRole,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  const canView = ROLES[userRole] >= ROLES[resource.minRoleRequired];

  return (
    <li style={{ padding: "8px 0", borderBottom: "1px solid #ddd" }}>
      <div>
        <strong>{resource.name}</strong>
        {!canView && <span style={{ marginLeft: 6 }}>🔒</span>}
      </div>
      <small>
        Requires: {resource.minRoleRequired} • Status: {resource.status.state}
      </small>

      {canView && (
        <div style={{ marginTop: 6 }}>
          {onEdit && <button onClick={() => onEdit(resource.id)}>Edit</button>}{" "}
          {onDelete && (
            <button onClick={() => onDelete(resource.id)}>Delete</button>
          )}{" "}
          {onToggleStatus && (
            <button onClick={() => onToggleStatus(resource.id)}>
              Toggle Status
            </button>
          )}
        </div>
      )}
    </li>
  );
}
