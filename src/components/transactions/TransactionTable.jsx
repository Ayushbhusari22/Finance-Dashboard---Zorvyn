import { useApp } from "../../hooks/useApp";
import { fmt, fmtDate } from "../../utils/formatters";
import { CAT_COLORS } from "../../data/constants";

export default function TransactionTable({ transactions, totalCount, onEdit, onDelete }) {
  const { state, dispatch } = useApp();
  const { sort, role } = state;

  const handleSort = (field) => {
    dispatch({
      type: "SET_SORT",
      payload: {
        field,
        dir: sort.field === field && sort.dir === "asc" ? "desc" : "asc",
      },
    });
  };

  const sortIcon = (field) => {
    if (sort.field !== field) return null;
    return <span style={{ marginLeft: 3, opacity: 0.7 }}>{sort.dir === "asc" ? "↑" : "↓"}</span>;
  };

  const filteredIncome  = transactions.filter((t) => t.type === "income") .reduce((s, t) => s + t.amount, 0);
  const filteredExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  const columns = [
    { field: "date",        label: "Date"        },
    { field: "description", label: "Description" },
    { field: "category",    label: "Category"    },
    { field: "amount",      label: "Amount"      },
    { field: "type",        label: "Type"        },
  ];

  return (
    <div style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr style={{ background: "#151820", borderBottom: "1px solid #2d3139" }}>
              {columns.map(({ field, label }) => (
                <th
                  key={field}
                  onClick={() => handleSort(field)}
                  style={{
                    padding: "9px 12px",
                    textAlign: "left",
                    color: sort.field === field ? "#e5e7eb" : "#9ca3af",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                  }}
                >
                  {label}{sortIcon(field)}
                </th>
              ))}
              {role === "admin" && (
                <th style={{
                  padding: "9px 12px",
                  color: "#9ca3af",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 6 : 5}
                  style={{ padding: "2.5rem", textAlign: "center", color: "#6b7280" }}
                >
                  No transactions match your filters.
                </td>
              </tr>
            ) : (
              transactions.map((t, i) => (
                <tr
                  key={t.id}
                  style={{
                    borderTop: "1px solid #1a1d24",
                    background: i % 2 === 0 ? "transparent" : "#171a21",
                  }}
                >
                  {/* Date */}
                  <td style={{
                    padding: "9px 12px",
                    color: "#9ca3af",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "11px",
                    whiteSpace: "nowrap",
                  }}>
                    {fmtDate(t.date)}
                  </td>

                  {/* Description */}
                  <td style={{ padding: "9px 12px", color: "#e5e7eb" }}>
                    {t.description}
                  </td>

                  {/* Category pill */}
                  <td style={{ padding: "9px 12px" }}>
                    <span style={{
                      background: (CAT_COLORS[t.category] || "#888") + "22",
                      color: CAT_COLORS[t.category] || "#888",
                      padding: "2px 8px",
                      borderRadius: 20,
                      fontSize: "11px",
                      fontWeight: 600,
                    }}>
                      {t.category}
                    </span>
                  </td>

                  {/* Amount */}
                  <td style={{
                    padding: "9px 12px",
                    fontFamily: "'DM Mono', monospace",
                    color: t.type === "income" ? "#22c55e" : "#ef4444",
                    fontWeight: 700,
                  }}>
                    {t.type === "income" ? "+" : "−"}{fmt(t.amount)}
                  </td>

                  {/* Type badge */}
                  <td style={{
                    padding: "9px 12px",
                    color: t.type === "income" ? "#22c55e" : "#ef4444",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}>
                    {t.type}
                  </td>

                  {/* Admin actions */}
                  {role === "admin" && (
                    <td style={{ padding: "9px 12px" }}>
                      <button
                        onClick={() => onEdit(t)}
                        style={{
                          background: "none",
                          border: "1px solid #2d3139",
                          borderRadius: 4,
                          color: "#9ca3af",
                          cursor: "pointer",
                          padding: "2px 8px",
                          fontSize: "11px",
                          marginRight: 4,
                          fontFamily: "inherit",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(t.id)}
                        style={{
                          background: "none",
                          border: "1px solid #ef444430",
                          borderRadius: 4,
                          color: "#ef4444",
                          cursor: "pointer",
                          padding: "2px 8px",
                          fontSize: "11px",
                          fontFamily: "inherit",
                        }}
                      >
                        Del
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer summary */}
      <div style={{
        padding: "8px 12px",
        borderTop: "1px solid #2d3139",
        display: "flex",
        justifyContent: "space-between",
        color: "#6b7280",
        fontSize: "11px",
      }}>
        <span>{transactions.length} of {totalCount} transactions</span>
        <span>
          <span style={{ color: "#22c55e", marginRight: 12 }}>+{fmt(filteredIncome)}</span>
          <span style={{ color: "#ef4444" }}>−{fmt(filteredExpense)}</span>
        </span>
      </div>
    </div>
  );
}
