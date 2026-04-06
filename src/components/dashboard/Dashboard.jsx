import { useMemo } from "react";
import { useApp } from "../../hooks/useApp";
import SummaryCard from "../ui/SummaryCard";
import LineChart   from "../charts/LineChart";
import BarChart    from "../charts/BarChart";
import DonutChart  from "../charts/DonutChart";
import { fmt }     from "../../utils/formatters";
import { CAT_COLORS, MONTHS_SHORT } from "../../data/constants";

export default function Dashboard() {
  const { state } = useApp();
  const { transactions } = state;

  // ── Totals ────────────────────────────────────────────────────────────────
  const totalIncome  = transactions.filter((t) => t.type === "income") .reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance      = totalIncome - totalExpense;

  const summaryCards = [
    { label: "Total Balance",  value: fmt(balance),      sub: "Net position", color: balance >= 0 ? "#22c55e" : "#ef4444", icon: "◈" },
    { label: "Total Income",   value: fmt(totalIncome),  sub: "All time",     color: "#22c55e", icon: "↑" },
    { label: "Total Expenses", value: fmt(totalExpense), sub: "All time",     color: "#ef4444", icon: "↓" },
    { label: "Transactions",   value: transactions.length, sub: "Records",   color: "#f59e0b", icon: "#" },
  ];

  // ── Monthly aggregates ────────────────────────────────────────────────────
  const monthlyMap = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { inc: 0, exp: 0 };
      if (t.type === "income") map[m].inc += t.amount;
      else                     map[m].exp += t.amount;
    });
    return map;
  }, [transactions]);

  const sortedMonths = Object.keys(monthlyMap).sort();

  // Line chart data: running balance per month
  const lineData = useMemo(() => {
    let running = 0;
    return sortedMonths.map((m) => {
      running += monthlyMap[m].inc - monthlyMap[m].exp;
      return { label: MONTHS_SHORT[parseInt(m.split("-")[1]) - 1], balance: running };
    });
  }, [monthlyMap, sortedMonths]);

  // Bar chart data: income + expense per month
  const barData = useMemo(() =>
    sortedMonths.map((m) => ({
      label: MONTHS_SHORT[parseInt(m.split("-")[1]) - 1],
      inc:   monthlyMap[m].inc,
      exp:   monthlyMap[m].exp,
    })),
  [monthlyMap, sortedMonths]);

  // Donut chart data: expense totals per category
  const catData = useMemo(() => {
    const map = {};
    transactions.filter((t) => t.type === "expense").forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => ({ label: k, value: v, color: CAT_COLORS[k] || "#888" }));
  }, [transactions]);

  return (
    <div>
      {/* Summary Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}>
        {summaryCards.map((c) => <SummaryCard key={c.label} {...c} />)}
      </div>

      {/* Charts Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}>
        <div style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, padding: "1.25rem" }}>
          <div style={chartTitleStyle}>Balance Trend</div>
          <LineChart data={lineData} />
        </div>
        <div style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, padding: "1.25rem" }}>
          <div style={chartTitleStyle}>Monthly Income vs Expense</div>
          <BarChart data={barData} />
        </div>
      </div>

      {/* Spending Breakdown (Donut + Legend) */}
      <div style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, padding: "1.25rem" }}>
        <div style={chartTitleStyle}>Spending Breakdown</div>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ width: 160, flexShrink: 0 }}>
            <DonutChart data={catData} size={160} />
          </div>
          <div style={{
            flex: 1, minWidth: 180,
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem 1rem",
          }}>
            {catData.map((c) => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>{c.label}</div>
                  <div style={{ fontSize: "12px", color: "#e5e7eb", fontFamily: "'DM Mono', monospace" }}>
                    {fmt(c.value)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const chartTitleStyle = {
  fontSize: "10px",
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: "0.75rem",
};
