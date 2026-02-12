import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResourceDetail from "./pages/ResourceDetail";
import NotAuthorized from "./pages/NotAuthorized";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthed, user, logout } = useAuth();

  return (
    <BrowserRouter>
      <header style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <Link to="/">Dashboard</Link>
        {!isAuthed ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <span>
              Hi, {user.username} ({user.role})
            </span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </header>

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Any logged-in user can access the dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute requiredRole="Viewer">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Resource-level authorization is checked inside ResourceDetail (per-item) */}
        <Route
          path="/resources/:id"
          element={
            <ProtectedRoute requiredRole="Viewer">
              <ResourceDetail />
            </ProtectedRoute>
          }
        />

        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter>
  );
}
