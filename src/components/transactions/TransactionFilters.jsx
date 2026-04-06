import { useApp } from "../../hooks/useApp";
import { CATEGORIES, MONTHS_SHORT } from "../../data/constants";

const selectStyle = {
  background: "#111318",
  border: "1px solid #2d3139",
  borderRadius: 6,
  color: "#e5e7eb",
  padding: "6px 8px",
  fontSize: "12px",
  fontFamily: "inherit",
};


export default function TransactionFilters({ onAdd }) {
  const { state, dispatch } = useApp();
  const { filter, search, role } = state;

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 12,
      alignItems: "center",
    }}>

      <input
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
        style={{
          ...selectStyle,
          flex: "1 1 160px",
          minWidth: 140,
          padding: "6px 10px",
        }}
      />

      <select
        value={filter.type}
        onChange={(e) => dispatch({ type: "SET_FILTER", payload: { type: e.target.value } })}
        style={selectStyle}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filter.category}
        onChange={(e) => dispatch({ type: "SET_FILTER", payload: { category: e.target.value } })}
        style={selectStyle}
      >
        <option value="all">All Categories</option>
        {[...CATEGORIES, "Income"].map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={filter.month}
        onChange={(e) => dispatch({ type: "SET_FILTER", payload: { month: e.target.value } })}
        style={selectStyle}
      >
        <option value="all">All Months</option>
        {MONTHS_SHORT.map((m, i) => (
          <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
        ))}
      </select>

      {role === "admin" && (
        <button
          onClick={onAdd}
          style={{
            padding: "6px 14px",
            background: "#f59e0b",
            border: "none",
            borderRadius: 6,
            color: "#000",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "12px",
            fontFamily: "inherit",
          }}
        >
          + Add
        </button>
      )}
    </div>
  );
}
