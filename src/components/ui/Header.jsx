import { useApp } from "../../hooks/useApp";

export default function Header() {
  const { state, dispatch } = useApp();

  return (
    <>
      <div style={{
        background: "#1c1f26",
        borderBottom: "1px solid #2d3139",
        padding: "0 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
      }}>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28,
            background: "#f59e0b", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 900, color: "#000",
          }}>₹</div>
          <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em", color: "#ffffff" }}>
            FinTrack
          </span>
          {/* <span style={{
            fontSize: "10px", color: "#6b7280",
            background: "#2d3139", padding: "2px 6px",
            borderRadius: 4, fontFamily: "'DM Mono', monospace",
          }}>v1.0</span> */}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "11px", color: "#6b7280" }}>Role:</span>
          <select
            value={state.role}
            onChange={(e) => dispatch({ type: "SET_ROLE", payload: e.target.value })}
            style={{
              background: "#2d3139",
              border: "1px solid #3d4149",
              borderRadius: 6,
              color: state.role === "admin" ? "#f59e0b" : "#9ca3af",
              padding: "4px 8px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>

          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: state.role === "admin" ? "#f59e0b22" : "#6b728022",
            border: `1px solid ${state.role === "admin" ? "#f59e0b44" : "#6b728044"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: 600,
            color: state.role === "admin" ? "#f59e0b" : "#9ca3af",
          }}>
            {state.role === "admin" ? "A" : "V"}
          </div>
        </div>
      </div>

      {state.role === "viewer" && (
        <div style={{
          background: "#1e293b",
          borderBottom: "1px solid #1e40af33",
          padding: "6px 1.5rem",
          fontSize: "11px",
          color: "#93c5fd",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          <span>ℹ</span>
          You are in <strong>Viewer mode</strong> — data is read-only.
          Switch to Admin to add or edit transactions.
        </div>
      )}
    </>
  );
}
