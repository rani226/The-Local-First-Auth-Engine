import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Viewer");

  const onSubmit = (e) => {
    e.preventDefault();
    login({ username, role, token: String(Date.now()) });

    const to = location.state?.from || "/";
    navigate(to, { replace: true });
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={onSubmit}
        style={{ display: "grid", gap: 8, maxWidth: 320 }}
      >
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Viewer</option>
            <option>Editor</option>
            <option>Admin</option>
          </select>
        </label>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
