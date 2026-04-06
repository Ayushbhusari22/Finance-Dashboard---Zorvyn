import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Transactions() {
  const { state, dispatch } = useContext(AppContext);
  const { transactions, filter, sort, search, role } = state;
  const [modal, setModal] = useState(null); // null | "add" | {edit: txn}
  const [confirm, setConfirm] = useState(null);

  const filtered = useMemo(() => {
    let tx = [...transactions];
    if (search) tx = tx.filter(t => t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));
    if (filter.type !== "all") tx = tx.filter(t => t.type === filter.type);
    if (filter.category !== "all") tx = tx.filter(t => t.category === filter.category);
    if (filter.month !== "all") tx = tx.filter(t => t.date.slice(5, 7) === filter.month);
    tx.sort((a, b) => {
      let av = a[sort.field], bv = b[sort.field];
      if (sort.field === "amount") { av = +av; bv = +bv; }
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return tx;
  }, [transactions, filter, sort, search]);

  const setSort = (field) => dispatch({ type: "SET_SORT", payload: { field, dir: sort.field === field && sort.dir === "asc" ? "desc" : "asc" } });
  const sortIcon = (f) => sort.field === f ? (sort.dir === "asc" ? " ↑" : " ↓") : "";

  const handleAdd = (form) => {
    dispatch({ type: "ADD_TRANSACTION", payload: { ...form, id: Date.now(), amount: Number(form.amount), category: form.type === "income" ? "Income" : form.category } });
    setModal(null);
  };
  const handleEdit = (form) => {
    dispatch({ type: "EDIT_TRANSACTION", payload: { ...form, amount: Number(form.amount), category: form.type === "income" ? "Income" : form.category } });
    setModal(null);
  };
  const handleDelete = (id) => { dispatch({ type: "DELETE_TRANSACTION", payload: id }); setConfirm(null); };

  const selStyle = { background: "#111318", border: "1px solid #2d3139", borderRadius: 6, color: "#e5e7eb", padding: "0.4rem 0.6rem", fontSize: "0.8rem" };

  return (
    <div>
      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1rem", alignItems: "center" }}>
        <input placeholder="Search..." value={search} onChange={e => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
          style={{ ...selStyle, flex: "1 1 160px", minWidth: 140 }} />
        <select value={filter.type} onChange={e => dispatch({ type: "SET_FILTER", payload: { type: e.target.value } })} style={selStyle}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filter.category} onChange={e => dispatch({ type: "SET_FILTER", payload: { category: e.target.value } })} style={selStyle}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filter.month} onChange={e => dispatch({ type: "SET_FILTER", payload: { month: e.target.value } })} style={selStyle}>
          <option value="all">All Months</option>
          {["01","02","03","04","05","06","07","08","09","10","11","12"].map((m, i) => <option key={m} value={m}>{MONTHS[i].slice(0,3)}</option>)}
        </select>
        {role === "admin" && (
          <button onClick={() => setModal("add")}
            style={{ padding: "0.4rem 1rem", background: "#f59e0b", border: "none", borderRadius: 6, color: "#000", fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}>
            + Add
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ background: "#1c1f26", border: "1px solid #2d3139", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2d3139", background: "#151820" }}>
                {[["date","Date"],["description","Description"],["category","Category"],["amount","Amount"],["type","Type"]].map(([f, l]) => (
                  <th key={f} onClick={() => setSort(f)} style={{ padding: "0.65rem 1rem", textAlign: "left", color: "#9ca3af", cursor: "pointer", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap", userSelect: "none" }}>
                    {l}{sortIcon(f)}
                  </th>
                ))}
                {role === "admin" && <th style={{ padding: "0.65rem 1rem", color: "#9ca3af", fontSize: "0.75rem" }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>No transactions found</td></tr>
              )}
              {filtered.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: "1px solid #1a1d24", background: i % 2 === 0 ? "transparent" : "#171a21" }}>
                  <td style={{ padding: "0.65rem 1rem", color: "#9ca3af", fontFamily: "'DM Mono', monospace", fontSize: "0.78rem" }}>{fmtDate(t.date)}</td>
                  <td style={{ padding: "0.65rem 1rem", color: "#e5e7eb" }}>{t.description}</td>
                  <td style={{ padding: "0.65rem 1rem" }}>
                    <span style={{ background: (CAT_COLORS[t.category] || "#888") + "22", color: CAT_COLORS[t.category] || "#888", padding: "2px 8px", borderRadius: 20, fontSize: "0.73rem", fontWeight: 600 }}>{t.category}</span>
                  </td>
                  <td style={{ padding: "0.65rem 1rem", fontFamily: "'DM Mono', monospace", color: t.type === "income" ? "#22c55e" : "#ef4444", fontWeight: 700 }}>
                    {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
                  </td>
                  <td style={{ padding: "0.65rem 1rem" }}>
                    <span style={{ color: t.type === "income" ? "#22c55e" : "#ef4444", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.type}</span>
                  </td>
                  {role === "admin" && (
                    <td style={{ padding: "0.65rem 1rem" }}>
                      <button onClick={() => setModal({ edit: t })} style={{ background: "none", border: "1px solid #2d3139", borderRadius: 4, color: "#9ca3af", cursor: "pointer", padding: "2px 8px", fontSize: "0.75rem", marginRight: 4 }}>Edit</button>
                      <button onClick={() => setConfirm(t.id)} style={{ background: "none", border: "1px solid #ef444430", borderRadius: 4, color: "#ef4444", cursor: "pointer", padding: "2px 8px", fontSize: "0.75rem" }}>Del</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid #2d3139", display: "flex", justifyContent: "space-between", color: "#6b7280", fontSize: "0.75rem" }}>
          <span>{filtered.length} of {transactions.length} transactions</span>
          <span>
            <span style={{ color: "#22c55e", marginRight: 12 }}>+{fmt(filtered.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0))}</span>
            <span style={{ color: "#ef4444" }}>-{fmt(filtered.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0))}</span>
          </span>
        </div>
      </div>

      {modal === "add" && <Modal title="Add Transaction" onClose={() => setModal(null)}><TransactionForm onSubmit={handleAdd} onClose={() => setModal(null)} /></Modal>}
      {modal?.edit && <Modal title="Edit Transaction" onClose={() => setModal(null)}><TransactionForm initial={modal.edit} onSubmit={handleEdit} onClose={() => setModal(null)} /></Modal>}
      {confirm && (
        <Modal title="Confirm Delete" onClose={() => setConfirm(null)}>
          <p style={{ color: "#9ca3af", marginBottom: "1rem" }}>Are you sure you want to delete this transaction?</p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => setConfirm(null)} style={{ flex: 1, padding: "0.6rem", borderRadius: 6, background: "#2d3139", border: "none", color: "#9ca3af", cursor: "pointer" }}>Cancel</button>
            <button onClick={() => handleDelete(confirm)} style={{ flex: 1, padding: "0.6rem", borderRadius: 6, background: "#ef4444", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}