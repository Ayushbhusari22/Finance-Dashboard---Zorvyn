export default function BarChart ({ data, height = 120 }) {
    if (!data || !data.length) return null;
    const maxVal = Math.max(...data.map(d => Math.max(d.income || 0, d.expense || 0)));
    return (
        <svg viewBox={`0 0 ${data.length * 60} ${height + 30}`} style={{ width: "100%", height: height + 30 }}>
            {data.map((d, i) => {
                const bw = 18, gap = 60, x = i * gap + 8;
                const ih = ((d.income || 0) / maxVal) * height;
                const eh = ((d.expense || 0) / maxVal) * height;
                return (
                    <g key={i}>
                        <rect x={x} y={height - ih} width={bw} height={ih} fill="#22c55e" opacity="0.8" rx="2" />
                        <rect x={x + bw + 2} y={height - eh} width={bw} height={eh} fill="#ef4444" opacity="0.8" rx="2" />
                        <text x={x + bw} y={height + 16} textAnchor="middle" fontSize="9" fill="#9ca3af">{d.label}</text>
                    </g>
                );
            })}
        </svg>
    );
}
