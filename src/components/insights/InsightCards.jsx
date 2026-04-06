import SummaryCard from "../ui/SummaryCard";
import { fmt } from "../../utils/formatters";
import { CAT_COLORS } from "../../data/constants";


export default function InsightCards({ topCategory, avgIncome, avgExpense, savingsRate }) {
  const cards = [
    {
      label: "Top Spending Category",
      value: topCategory ? topCategory[0] : "—",
      sub:   topCategory ? `${fmt(topCategory[1])} total` : "No expense data",
      color: CAT_COLORS[topCategory?.[0]] || "#f59e0b",
      icon:  "★",
    },
    {
      label: "Avg Monthly Income",
      value: fmt(avgIncome),
      sub:   "per month",
      color: "#22c55e",
      icon:  "↑",
    },
    {
      label: "Avg Monthly Expense",
      value: fmt(avgExpense),
      sub:   "per month",
      color: "#ef4444",
      icon:  "↓",
    },
    {
      label: "Savings Rate",
      value: `${savingsRate}%`,
      sub:   "of income saved",
      color: Number(savingsRate) >= 20 ? "#22c55e" : "#f59e0b",
      icon:  "◎",
    },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "1rem",
      marginBottom: "1.5rem",
    }}>
      {cards.map((c) => <SummaryCard key={c.label} {...c} />)}
    </div>
  );
}
