import { fmt } from "../../utils/formatters";

export default function MonthlyComparison({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>
        No monthly data available.
      </div>
    );
  }

  return (
    <div style={{
      background: "#1c1f26",
      border: "1px solid #2d3139",
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: "1rem",
    }}>
      <div style={panelHeadStyle}>Monthly Comparison</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr style={{ background: "#151820" }}>
              {["Month", "Income", "Expenses", "Savings", "Rate"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "8px 12px",
                    textAlign: "left",
                    color: "#6b7280",
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((m, i) => {
              const rate = m.inc ? Math.round((m.sav / m.inc) * 100) : 0;
              const barWidth = Math.max(0, Math.min(100, rate));

              return (
                <tr
                  key={m.month}
                  style={{
                    borderTop: "1px solid #1a1d24",
                    background: i % 2 === 0 ? "transparent" : "#171a21",
                  }}
                >
                  <td style={{ padding: "8px 12px", color: "#e5e7eb" }}>{m.month}</td>
                  <td style={{ padding: "8px 12px", color: "#22c55e", fontFamily: "'DM Mono', monospace" }}>
                    {fmt(m.inc)}
                  </td>
                  <td style={{ padding: "8px 12px", color: "#ef4444", fontFamily: "'DM Mono', monospace" }}>
                    {fmt(m.exp)}
                  </td>
                  <td style={{
                    padding: "8px 12px",
                    color: m.sav >= 0 ? "#22c55e" : "#ef4444",
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    {m.sav >= 0 ? "+" : ""}{fmt(m.sav)}
                  </td>

                  {/* Progress bar cell */}
                  <td style={{ padding: "8px 12px", minWidth: 90 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{
                        flex: 1, height: 4,
                        background: "#2d3139",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}>
                        <div style={{
                          height: "100%",
                          width: `${barWidth}%`,
                          background: m.sav >= 0 ? "#22c55e" : "#ef4444",
                          borderRadius: 2,
                          transition: "width 0.4s",
                        }} />
                      </div>
                      <span style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        minWidth: 32,
                        fontFamily: "'DM Mono', monospace",
                      }}>
                        {rate}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
