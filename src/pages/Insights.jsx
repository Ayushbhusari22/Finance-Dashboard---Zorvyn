import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Insights () {
    const { state } = useContext(AppContext);
    const { transactions } = state;

    const expenses = transactions.filter(t => t.type === "expense");
    const income = transactions.filter(t => t.type === "income");

    const catTotals = useMemo(() => {
        const map = {};
        expenses.forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
        return Object.entries(map).sort((a, b) => b[1] - a[1]);
    }, [expenses]);

    const topCat = catTotals[0];

    const monthlyData = useMemo(() => {
        const map = {};
        transactions.forEach(t => {
            const m = t.date.slice(0, 7);
            if (!map[m]) map[m] = { income: 0, expense: 0 };
            map[m][t.type] += t.amount;
        });
        return Object.entries(map).sort().map(([m, v]) => ({ month: MONTHS[parseInt(m.split("-")[1]) - 1], ...v, savings: v.income - v.expense }));
    }, [transactions]);

    const avgIncome = income.length ? income.reduce((s, t) => s + t.amount, 0) / (new Set(income.map(t => t.date.slice(0, 7))).size || 1) : 0;
    const avgExpense = expenses.length ? expenses.reduce((s, t) => s + t.amount, 0) / (new Set(expenses.map(t => t.date.slice(0, 7))).size || 1) : 0;
    const savingsRate = avgIncome ? ((avgIncome - avgExpense) / avgIncome * 100).toFixed(1) : 0;

    const insightCards = [
        { title: "Top Spending Category", value: topCat ? topCat[0] : "—", sub: topCat ? fmt(topCat[1]) + " total" : "", color: CAT_COLORS[topCat?.[0]] || "#f59e0b" },
        { title: "Avg Monthly Income", value: fmt(avgIncome), sub: "per month", color: "#22c55e" },
        { title: "Avg Monthly Expense", value: fmt(avgExpense), sub: "per month", color: "#ef4444" },
        { title: "Savings Rate", value: savingsRate + "%", sub: "income saved", color: Number(savingsRate) > 20 ? "#22c55e" : "#f59e0b" },
    ];

    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                {insightCards.map(c => (
                    <div key={c.title} style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, padding: "1.25rem" }}>
                        <div style={{ fontSize: "0.7rem", color: "#6b7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.title}</div>
                        <div style={{ fontSize: "1.4rem", fontWeight: 800, color: c.color, fontFamily: "'DM Mono', monospace" }}>{c.value}</div>
                        <div style={{ fontSize: "0.72rem", color: "#4b5563", marginTop: 4 }}>{c.sub}</div>
                    </div>
                ))}
            </div>

            {/* Monthly comparison table */}
            <div style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, overflow: "hidden", marginBottom: "1rem" }}>
                <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #2d3139", fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Monthly Comparison</div>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                        <thead>
                            <tr style={{ background: "#151820" }}>
                                {["Month", "Income", "Expenses", "Savings", "Rate"].map(h => (
                                    <th key={h} style={{ padding: "0.6rem 1rem", textAlign: "left", color: "#6b7280", fontSize: "0.73rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData.map((m, i) => (
                                <tr key={m.month} style={{ borderTop: "1px solid #1a1d24", background: i % 2 === 0 ? "transparent" : "#171a21" }}>
                                    <td style={{ padding: "0.65rem 1rem", color: "#e5e7eb" }}>{m.month}</td>
                                    <td style={{ padding: "0.65rem 1rem", color: "#22c55e", fontFamily: "'DM Mono', monospace" }}>{fmt(m.income)}</td>
                                    <td style={{ padding: "0.65rem 1rem", color: "#ef4444", fontFamily: "'DM Mono', monospace" }}>{fmt(m.expense)}</td>
                                    <td style={{ padding: "0.65rem 1rem", color: m.savings >= 0 ? "#22c55e" : "#ef4444", fontFamily: "'DM Mono', monospace" }}>{m.savings >= 0 ? "+" : ""}{fmt(m.savings)}</td>
                                    <td style={{ padding: "0.65rem 1rem" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <div style={{ flex: 1, height: 4, background: "#2d3139", borderRadius: 2, overflow: "hidden" }}>
                                                <div style={{ height: "100%", width: `${Math.max(0, m.income ? (m.savings / m.income * 100) : 0)}%`, background: m.savings >= 0 ? "#22c55e" : "#ef4444", borderRadius: 2 }} />
                                            </div>
                                            <span style={{ fontSize: "0.72rem", color: "#9ca3af", minWidth: 36, fontFamily: "'DM Mono', monospace" }}>
                                                {m.income ? (m.savings / m.income * 100).toFixed(0) : 0}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Category breakdown */}
            <div style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, padding: "1.25rem" }}>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Category Breakdown</div>
                {catTotals.map(([cat, val]) => {
                    const pct = catTotals[0] ? (val / catTotals[0][1]) * 100 : 0;
                    return (
                        <div key={cat} style={{ marginBottom: "0.75rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                <span style={{ fontSize: "0.8rem", color: "#e5e7eb" }}>{cat}</span>
                                <span style={{ fontSize: "0.8rem", color: CAT_COLORS[cat] || "#888", fontFamily: "'DM Mono', monospace" }}>{fmt(val)}</span>
                            </div>
                            <div style={{ height: 5, background: "#2d3139", borderRadius: 3 }}>
                                <div style={{ height: "100%", width: `${pct}%`, background: CAT_COLORS[cat] || "#888", borderRadius: 3, transition: "width 0.4s" }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

