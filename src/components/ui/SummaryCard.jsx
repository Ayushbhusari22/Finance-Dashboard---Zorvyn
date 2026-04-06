export default function SummaryCard({ label, value, sub, color, icon }) {
  return (
    <div style={{
      background: "#1c1f26",
      border: "1px solid #2d3139",
      borderRadius: 10,
      padding: "1.25rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: 14, top: 14,
        fontSize: "22px", color, opacity: 0.25,
        fontFamily: "monospace", userSelect: "none",
      }}>
        {icon}
      </div>

      <div style={{
        fontSize: "10px", color: "#6b7280",
        textTransform: "uppercase", letterSpacing: "0.08em",
        marginBottom: 4,
      }}>
        {label}
      </div>

      <div style={{
        fontSize: "1.25rem", fontWeight: 800,
        color, fontFamily: "'DM Mono', monospace",
        lineHeight: 1.2,
      }}>
        {value}
      </div>

      <div style={{ fontSize: "11px", color: "#4b5563", marginTop: 4 }}>
        {sub}
      </div>
    </div>
  );
}
