import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

export default function App () {
  const { state, dispatch } = useContext(AppContext);

  const tabs = [
    { id: "dashboard", label: "Overview" },
    { id: "transactions", label: "Transactions" },
    { id: "insights", label: "Insights" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#fff" }}>

      {/* Header */}
      <div style={{ padding: "1rem", borderBottom: "1px solid #333" }}>
        <h2>FinTrack</h2>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => dispatch({ type: "SET_ACTIVE_TAB", payload: t.id })}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "1rem" }}>
        {state.activeTab === "dashboard" && <Dashboard />}
        {state.activeTab === "transactions" && <Transactions />}
        {state.activeTab === "insights" && <Insights />}
      </div>
    </div>
  );
}