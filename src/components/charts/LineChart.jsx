export default function LineChart ({ data, width = 400, height = 120 }) {
    if (!data || data.length < 2) return <div style={{ color: "#6b7280", textAlign: "center", padding: "2rem" }}>No data</div>;
    const vals = data.map(d => d.balance);
    const min = Math.min(...vals), max = Math.max(...vals);
    const range = max - min || 1;
    const padX = 40, padY = 15;
    const w = width - padX * 2, h = height - padY * 2;
    const pts = data.map((d, i) => {
        const x = padX + (i / (data.length - 1)) * w;
        const y = padY + (1 - (d.balance - min) / range) * h;
        return `${x},${y}`;
    });
    const areaPath = `M${pts.join("L")}L${padX + w},${padY + h}L${padX},${padY + h}Z`;
    const linePath = `M${pts.join("L")}`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "100%" }}>
            <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#lg)" />
            <path d={linePath} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
            {data.map((d, i) => {
                const [x, y] = pts[i].split(",").map(Number);
                return (
                    <g key={i}>
                        <circle cx={x} cy={y} r="3" fill="#f59e0b" />
                        <text x={x} y={height - 2} fontSize="9" fill="#6b7280" textAnchor="middle">{d.label}</text>
                    </g>
                );
            })}
            <text x={padX - 4} y={padY + 4} fontSize="9" fill="#6b7280" textAnchor="end">{fmt(max)}</text>
            <text x={padX - 4} y={padY + h + 4} fontSize="9" fill="#6b7280" textAnchor="end">{fmt(min)}</text>
        </svg>
    );
}
