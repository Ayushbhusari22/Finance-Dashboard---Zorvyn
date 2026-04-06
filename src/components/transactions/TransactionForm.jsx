import { useState } from "react";
import { CATEGORIES } from "../../data/constants";

const inputStyle = {
  width: "100%",
  background: "#111318",
  border: "1px solid #2d3139",
  borderRadius: 6,
  color: "#e5e7eb",
  padding: "8px 10px",
  fontSize: "13px",
  fontFamily: "inherit",
  marginBottom: 10,
};

const labelStyle = {
  display: "block",
  fontSize: "11px",
  color: "#9ca3af",
  marginBottom: 4,
};

export default function TransactionForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState(
    initial || { date: "", description: "", amount: "", category: "Food", type: "expense" }
  );

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleTypeChange = (val) => {
    set("type", val);
    if (val === "income") set("category", "Income");
    else set("category", "Food");
  };

  const handleSubmit = () => {
    if (!form.date || !form.description || !form.amount) return;
    onSubmit({
      ...form,
      amount: Number(form.amount),
      category: form.type === "income" ? "Income" : form.category,
    });
  };

  return (
    <div>
      <label style={labelStyle}>Date</label>
      <input
        type="date"
        value={form.date}
        onChange={(e) => set("date", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>Description</label>
      <input
        type="text"
        value={form.description}
        onChange={(e) => set("description", e.target.value)}
        placeholder="e.g. Salary, Zomato..."
        style={inputStyle}
      />

      <label style={labelStyle}>Amount (₹)</label>
      <input
        type="number"
        value={form.amount}
        onChange={(e) => set("amount", e.target.value)}
        placeholder="0"
        style={inputStyle}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Type</label>
          <select
            value={form.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            style={{ ...inputStyle, marginBottom: 0 }}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            disabled={form.type === "income"}
            style={{
              ...inputStyle,
              marginBottom: 0,
              opacity: form.type === "income" ? 0.5 : 1,
            }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onClose}
          style={{
            flex: 1, padding: "9px",
            borderRadius: 6, background: "#2d3139",
            border: "none", color: "#9ca3af",
            cursor: "pointer", fontFamily: "inherit", fontSize: "13px",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          style={{
            flex: 1, padding: "9px",
            borderRadius: 6, background: "#f59e0b",
            border: "none", color: "#000",
            fontWeight: 700, cursor: "pointer",
            fontFamily: "inherit", fontSize: "13px",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
