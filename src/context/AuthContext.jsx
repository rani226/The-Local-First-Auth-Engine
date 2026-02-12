import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const LS_KEY = "auth.v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Rehydrate from localStorage on load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.token) setUser(parsed);
      }
    } catch {
      // ignore
    } finally {
      setInitializing(false);
    }
  }, []);

  // Persist user
  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_KEY);
  }, [user]);

  // Cross-tab sync (logout/login reflected across tabs)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === LS_KEY) {
        if (!e.newValue) setUser(null);
        else {
          try {
            const parsed = JSON.parse(e.newValue);
            setUser(parsed?.token ? parsed : null);
          } catch {
            setUser(null);
          }
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthed: !!user?.token,
      initializing,
      login: (payload) => setUser(payload),
      logout: () => setUser(null),
    }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

