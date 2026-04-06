import { fmt } from "../../utils/formatters";
import { CAT_COLORS } from "../../data/constants";

export default function CategoryBreakdown({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: "1.5rem", textAlign: "center", color: "#6b7280" }}>
        No expense data available.
      </div>
    );
  }

  const max = data[0][1];

  return (
    <div style={{
      background: "#1c1f26",
      border: "1px solid #2d3139",
      borderRadius: 10,
      overflow: "hidden",
    }}>
      <div style={panelHeadStyle}>Category Breakdown</div>
      <div style={{ padding: "1rem" }}>
        {data.map(([cat, val]) => {
          const pct = max ? ((val / max) * 100).toFixed(0) : 0;
          const color = CAT_COLORS[cat] || "#888";

          return (
            <div key={cat} style={{ marginBottom: "0.85rem" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 10, height: 10,
                    borderRadius: 2,
                    background: color,
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: "12px", color: "#e5e7eb" }}>{cat}</span>
                </div>
                <span style={{
                  fontSize: "12px",
                  color,
                  fontFamily: "'DM Mono', monospace",
                }}>
                  {fmt(val)}
                </span>
              </div>

              <div style={{
                height: 5,
                background: "#2d3139",
                borderRadius: 3,
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: color,
                  borderRadius: 3,
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const panelHeadStyle = {
  padding: "10px 1rem",
  borderBottom: "1px solid #2d3139",
  fontSize: "10px",
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};
