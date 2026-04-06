import { fmt } from "../../utils/formatters";

export default function LineChart({ data }) {
  if (!data || data.length < 2) {
    return (
      <div style={{ color: "#6b7280", textAlign: "center", padding: "2rem" }}>
        Not enough data
      </div>
    );
  }

  const W = 380, H = 120, pX = 46, pY = 14;
  const w = W - pX * 2;
  const h = H - pY * 2;

  const vals = data.map((d) => d.balance);
  const min  = Math.min(...vals);
  const max  = Math.max(...vals);
  const rng  = max - min || 1;

  const pts = data.map((d, i) => [
    pX + (i / (data.length - 1)) * w,
    pY + (1 - (d.balance - min) / rng) * h,
  ]);

  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join("");
  const area = `${line}L${pX + w},${pY + h}L${pX},${pY + h}Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: H }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"   />
        </linearGradient>
      </defs>

      <path d={area} fill="url(#lineGrad)" />
      <path d={line} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />

      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="#f59e0b" />
          <text x={x} y={H - 2} fontSize="9" fill="#6b7280" textAnchor="middle">
            {data[i].label}
          </text>
        </g>
      ))}

      <text x={pX - 4} y={pY + 4}     fontSize="9" fill="#6b7280" textAnchor="end">{fmt(max)}</text>
      <text x={pX - 4} y={pY + h + 4} fontSize="9" fill="#6b7280" textAnchor="end">{fmt(min)}</text>
    </svg>
  );
}
