import { useEffect, useState } from "react";
import ResourceList from "../components/ResourceList";
import { resourcesSeed } from "../data/resources";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated fetch (useEffect + setTimeout)
  useEffect(() => {
    const id = setTimeout(() => {
      setResources(resourcesSeed);
      setLoading(false);
    }, 500);
    return () => clearTimeout(id);
  }, []);

  // Derived lists (safe when [] during loading)
  const active = resources.filter((r) => r.status.state === "active");
  const archived = resources.filter((r) => r.status.state === "archived");

  const activeToRender = active;
  const archivedToRender = archived;

  const toggleStatus = (id) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: {
                ...r.status,
                state: r.status.state === "active" ? "archived" : "active",
              },
            }
          : r
      )
    );
  };

  const deleteItem = (id) => {
    if (user?.role !== "Admin") return;
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  const editItem = (id) => {
    if (user?.role === "Admin" || user?.role === "Editor") {
      alert(`Edit ${id}`);
    }
  };

  return (
    <div>
      <h1>Resource Dashboard</h1>
      <p>
        Welcome, {user?.username ?? "…"} ({user?.role ?? "…"})
      </p>

      {loading ? (
        <p>Loading resources…</p>
      ) : (
        <>
          <ResourceList
            title="Active Tasks"
            items={activeToRender}
            userRole={user?.role ?? "Viewer"}
            onToggleStatus={toggleStatus}
            onEdit={editItem}
            onDelete={user?.role === "Admin" ? deleteItem : undefined}
          />

          <ResourceList
            title="Archived Tasks"
            items={archivedToRender}
            userRole={user?.role ?? "Viewer"}
            onToggleStatus={toggleStatus}
            onEdit={editItem}
            onDelete={user?.role === "Admin" ? deleteItem : undefined}
          />
        </>
      )}
    </div>
  );
}

