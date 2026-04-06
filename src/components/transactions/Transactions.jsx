import { useState } from "react";
import { useApp } from "../../hooks/useApp";
import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";
import { genId } from "../../utils/formatters";
import TransactionFilters from "./TransactionFilters";
import TransactionTable   from "./TransactionTable";
import TransactionForm    from "./TransactionForm";
import Modal              from "../ui/Modal";

export default function Transactions() {
  const { state, dispatch } = useApp();
  const filtered = useFilteredTransactions();

  const [modalMode, setModalMode]     = useState(null);
  const [editTarget, setEditTarget]   = useState(null);
  const [confirmId, setConfirmId]     = useState(null);

  const openAdd  = () => { setEditTarget(null); setModalMode("add"); };
  const openEdit = (txn) => { setEditTarget(txn); setModalMode("edit"); };
  const closeModal = () => { setModalMode(null); setEditTarget(null); };

  const handleSave = (formData) => {
    if (modalMode === "add") {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: { ...formData, id: genId() },
      });
    } else {
      dispatch({
        type: "EDIT_TRANSACTION",
        payload: { ...editTarget, ...formData },
      });
    }
    closeModal();
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TRANSACTION", payload: confirmId });
    setConfirmId(null);
  };

  return (
    <div>
      <TransactionFilters onAdd={openAdd} />

      <TransactionTable
        transactions={filtered}
        totalCount={state.transactions.length}
        onEdit={openEdit}
        onDelete={(id) => setConfirmId(id)}
      />

      {/* Add / Edit Modal */}
      {modalMode && (
        <Modal
          title={modalMode === "add" ? "Add Transaction" : "Edit Transaction"}
          onClose={closeModal}
        >
          <TransactionForm
            initial={editTarget}
            onSubmit={handleSave}
            onClose={closeModal}
          />
        </Modal>
      )}

      {confirmId !== null && (
        <Modal title="Confirm Delete" onClose={() => setConfirmId(null)}>
          <p style={{ color: "#9ca3af", fontSize: "13px", marginBottom: "1.25rem" }}>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setConfirmId(null)}
              style={{
                flex: 1, padding: "9px", borderRadius: 6,
                background: "#2d3139", border: "none",
                color: "#9ca3af", cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              style={{
                flex: 1, padding: "9px", borderRadius: 6,
                background: "#ef4444", border: "none",
                color: "#fff", fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
