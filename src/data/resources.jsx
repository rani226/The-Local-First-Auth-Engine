export const ROLES = {
  Viewer: 1,
  Editor: 2,
  Admin: 3,
};

export const resourcesSeed = [
  {
    id: "r1",
    name: "Quarterly Report",
    minRoleRequired: "Viewer",
    status: { state: "active", updatedAt: "2026-02-01" },
  },
  {
    id: "r2",
    name: "Marketing Plan",
    minRoleRequired: "Editor",
    status: { state: "active", updatedAt: "2026-02-02" },
  },
  {
    id: "r3",
    name: "Security Policy",
    minRoleRequired: "Admin",
    status: { state: "archived", updatedAt: "2026-01-20" },
  },
  {
    id: "r4",
    name: "Product Roadmap",
    minRoleRequired: "Editor",
    status: { state: "active", updatedAt: "2026-02-03" },
  },
  {
    id: "r5",
    name: "Team Directory",
    minRoleRequired: "Viewer",
    status: { state: "archived", updatedAt: "2025-12-31" },
  },
];

