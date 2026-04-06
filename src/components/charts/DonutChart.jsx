export default function DonutChart ({ data, size = 180 }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    if (!total) return null;
    let cumAngle = -Math.PI / 2;
    const cx = size / 2, cy = size / 2, r = size * 0.38, ir = size * 0.22;
    const slices = data.map(d => {
        const angle = (d.value / total) * 2 * Math.PI;
        const x1 = cx + r * Math.cos(cumAngle), y1 = cy + r * Math.sin(cumAngle);
        cumAngle += angle;
        const x2 = cx + r * Math.cos(cumAngle), y2 = cy + r * Math.sin(cumAngle);
        const xi1 = cx + ir * Math.cos(cumAngle - angle), yi1 = cy + ir * Math.sin(cumAngle - angle);
        const xi2 = cx + ir * Math.cos(cumAngle), yi2 = cy + ir * Math.sin(cumAngle);
        const lg = angle > Math.PI ? 1 : 0;
        return { ...d, path: `M${x1},${y1}A${r},${r},0,${lg},1,${x2},${y2}L${xi2},${yi2}A${ir},${ir},0,${lg},0,${xi1},${yi1}Z` };
    });
    return (
        <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", maxWidth: size }}>
            {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} opacity="0.9" />)}
            <text x={cx} y={cy - 6} textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="600">Total</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill="#f59e0b" fontSize="10">{fmt(total)}</text>
        </svg>
    );
}
