import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";

import { MONTHS } from "../constants/months";

export default function Dashboard () {
    const { state } = useContext(AppContext);
    const txns = state.transactions;

    const totalIncome = txns.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpense = txns.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const balance = totalIncome - totalExpense;

    // Monthly data for line chart
    const monthlyBalance = useMemo(() => {
        const map = {};
        txns.forEach(t => {
            const m = t.date.slice(0, 7);
            if (!map[m]) map[m] = 0;
            map[m] += t.type === "income" ? t.amount : -t.amount;
        });
        let running = 0;
        return Object.keys(map).sort().map(m => {
            running += map[m];
            return { label: MONTHS[parseInt(m.split("-")[1]) - 1].slice(0, 3), balance: running };
        });
    }, [txns]);

    // Monthly income vs expense for bar chart
    const monthlyBar = useMemo(() => {
        const map = {};
        txns.forEach(t => {
            const m = t.date.slice(0, 7);
            if (!map[m]) map[m] = { income: 0, expense: 0 };
            map[m][t.type] += t.amount;
        });
        return Object.keys(map).sort().map(m => ({ label: MONTHS[parseInt(m.split("-")[1]) - 1].slice(0, 3), ...map[m] }));
    }, [txns]);

    // Spending by category (donut)
    const catData = useMemo(() => {
        const map = {};
        txns.filter(t => t.type === "expense").forEach(t => {
            map[t.category] = (map[t.category] || 0) + t.amount;
        });
        return Object.entries(map).map(([k, v]) => ({ label: k, value: v, color: CAT_COLORS[k] || "#888" }));
    }, [txns]);

    const cards = [
        { label: "Total Balance", value: fmt(balance), sub: "Net position", color: balance >= 0 ? "#22c55e" : "#ef4444", icon: "◈" },
        { label: "Total Income", value: fmt(totalIncome), sub: "All time", color: "#22c55e", icon: "↑" },
        { label: "Total Expenses", value: fmt(totalExpense), sub: "All time", color: "#ef4444", icon: "↓" },
        { label: "Transactions", value: txns.length, sub: "Records", color: "#f59e0b", icon: "#" },
    ];

    return (
        <div>
            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                {cards.map(c => (
                    <div key={c.label} style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, padding: "1.25rem", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", right: 16, top: 16, fontSize: "1.5rem", color: c.color, opacity: 0.3, fontFamily: "monospace" }}>{c.icon}</div>
                        <div style={{ fontSize: "0.7rem", color: "#6b7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.label}</div>
                        <div style={{ fontSize: "1.35rem", fontWeight: 800, color: c.color, fontFamily: "'DM Mono', monospace", lineHeight: 1.2 }}>{c.value}</div>
                        <div style={{ fontSize: "0.7rem", color: "#4b5563", marginTop: 4 }}>{c.sub}</div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, padding: "1.25rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Balance Trend</div>
                    <LineChart data={monthlyBalance} height={120} />
                </div>
                <div style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, padding: "1.25rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Monthly Income vs Expense</div>
                    <BarChart data={monthlyBar} height={110} />
                    <div style={{ display: "flex", gap: "1rem", marginTop: 4 }}>
                        <span style={{ fontSize: "0.7rem", color: "#22c55e" }}>■ Income</span>
                        <span style={{ fontSize: "0.7rem", color: "#ef4444" }}>■ Expense</span>
                    </div>
                </div>
            </div>

            {/* Donut + Legend */}
            <div style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, padding: "1.25rem" }}>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Spending Breakdown</div>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                    <div style={{ width: 160, flexShrink: 0 }}>
                        <DonutChart data={catData} size={160} />
                    </div>
                    <div style={{ flex: 1, minWidth: 180, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1rem" }}>
                        {catData.sort((a, b) => b.value - a.value).map(c => (
                            <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 10, height: 10, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{c.label}</div>
                                    <div style={{ fontSize: "0.8rem", color: "#e5e7eb", fontFamily: "'DM Mono', monospace" }}>{fmt(c.value)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}