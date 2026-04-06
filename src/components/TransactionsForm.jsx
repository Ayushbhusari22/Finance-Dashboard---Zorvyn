import { useState } from "react";

export default function TransactionForm ({ initial, onSubmit, onClose }) {
    const [form, setForm] = useState(initial || { date: "", description: "", amount: "", category: "Food", type: "expense" });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    return (
        <div>
            {[
                { label: "Date", key: "date", type: "date" },
                { label: "Description", key: "description", type: "text" },
                { label: "Amount (₹)", key: "amount", type: "number" },
            ].map(f => (
                <div key={f.key} style={{ marginBottom: "0.75rem" }}>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "#9ca3af", marginBottom: 4 }}>{f.label}</label>
                    <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                        style={{ width: "100%", background: "#111318", border: "1px solid #2d3139", borderRadius: 6, color: "#e5e7eb", padding: "0.5rem 0.75rem", fontSize: "0.875rem", boxSizing: "border-box" }} />
                </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "#9ca3af", marginBottom: 4 }}>Category</label>
                    <select value={form.category} onChange={e => set("category", e.target.value)}
                        style={{ width: "100%", background: "#111318", border: "1px solid #2d3139", borderRadius: 6, color: "#e5e7eb", padding: "0.5rem 0.75rem", fontSize: "0.875rem" }}>
                        {CATEGORIES.filter(c => c !== "Income").map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "#9ca3af", marginBottom: 4 }}>Type</label>
                    <select value={form.type} onChange={e => { set("type", e.target.value); if (e.target.value === "income") set("category", "Income"); }}
                        style={{ width: "100%", background: "#111318", border: "1px solid #2d3139", borderRadius: 6, color: "#e5e7eb", padding: "0.5rem 0.75rem", fontSize: "0.875rem" }}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={onClose} style={{ flex: 1, padding: "0.6rem", borderRadius: 6, background: "#2d3139", border: "none", color: "#9ca3af", cursor: "pointer" }}>Cancel</button>
                <button onClick={() => onSubmit(form)} style={{ flex: 1, padding: "0.6rem", borderRadius: 6, background: "#f59e0b", border: "none", color: "#000", fontWeight: 700, cursor: "pointer" }}>Save</button>
            </div>
        </div>
    );
}