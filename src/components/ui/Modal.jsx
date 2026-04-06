export default function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.7)",
      zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{
        background: "#1c1f26",
        border: "1px solid #2d3139",
        borderRadius: 12,
        width: "100%", maxWidth: 460,
        padding: "1.5rem",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "1.25rem",
        }}>
          <span style={{
            fontSize: "14px", fontWeight: 700,
            color: "#e5e7eb", fontFamily: "'DM Mono', monospace",
          }}>
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none",
              color: "#6b7280", cursor: "pointer", fontSize: "18px",
            }}
          >✕</button>
        </div>

        {children}
      </div>
    </div>
  );
}
