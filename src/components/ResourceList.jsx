import ResourceItem from "./ResourceItem";

export default function ResourceList({
  title,
  items = [],
  userRole = "Viewer",
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <section style={{ margin: "16px 0" }}>
      <h2>{title}</h2>
      {items.length === 0 ? (
        <p>No items</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {items.map((res) => (
            <ResourceItem
              key={res.id}
              resource={res}
              userRole={userRole}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
``;

