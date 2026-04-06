export default function BarChart({ data }) {
  if (!data || data.length === 0) return null;

  const H   = 110;
  const bw  = 16;
  const gap = 56;
  const W   = data.length * gap;
  const max = Math.max(...data.map((d) => Math.max(d.inc || 0, d.exp || 0)));

  return (
    <>
      <svg
        viewBox={`0 0 ${W} ${H + 24}`}
        style={{ width: "100%", height: H + 24 }}
      >
        {data.map((d, i) => {
          const x  = i * gap + 8;
          const ih = ((d.inc || 0) / max) * H;
          const eh = ((d.exp || 0) / max) * H;

          return (
            <g key={i}>
              <rect x={x}          y={H - ih} width={bw} height={ih} fill="#22c55e" opacity="0.8" rx="2" />
              <rect x={x + bw + 2} y={H - eh} width={bw} height={eh} fill="#ef4444" opacity="0.8" rx="2" />
              <text x={x + bw} y={H + 16} textAnchor="middle" fontSize="9" fill="#9ca3af">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
        <span style={{ fontSize: "11px", color: "#22c55e" }}>■ Income</span>
        <span style={{ fontSize: "11px", color: "#ef4444" }}>■ Expense</span>
      </div>
    </>
  );
}
