import { useMemo } from "react";
import { useApp } from "../../hooks/useApp";
import InsightCards       from "./InsightCards";
import MonthlyComparison  from "./MonthlyComparison";
import CategoryBreakdown  from "./CategoryBreakdown";
import { MONTHS_FULL } from "../../data/constants";

export default function Insights() {
  const { state } = useApp();
  const { transactions } = state;

  const expenses = transactions.filter((t) => t.type === "expense");
  const income   = transactions.filter((t) => t.type === "income");

  const catTotals = useMemo(() => {
    const map = {};
    expenses.forEach((t) => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  const incomeMonths  = new Set(income .map((t) => t.date.slice(0, 7))).size || 1;
  const expenseMonths = new Set(expenses.map((t) => t.date.slice(0, 7))).size || 1;

  const avgIncome  = income .reduce((s, t) => s + t.amount, 0) / incomeMonths;
  const avgExpense = expenses.reduce((s, t) => s + t.amount, 0) / expenseMonths;
  const savingsRate = avgIncome
    ? ((avgIncome - avgExpense) / avgIncome * 100).toFixed(1)
    : "0.0";

  const monthlyData = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { inc: 0, exp: 0 };
      if (t.type === "income") map[m].inc += t.amount;
      else                     map[m].exp += t.amount;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([m, v]) => ({
        month: MONTHS_FULL[parseInt(m.split("-")[1]) - 1],
        inc:   v.inc,
        exp:   v.exp,
        sav:   v.inc - v.exp,
      }));
  }, [transactions]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      <InsightCards
        topCategory={catTotals[0]}
        avgIncome={avgIncome}
        avgExpense={avgExpense}
        savingsRate={savingsRate}
      />
      <MonthlyComparison data={monthlyData} />
      <CategoryBreakdown data={catTotals}   />
    </div>
  );
}
