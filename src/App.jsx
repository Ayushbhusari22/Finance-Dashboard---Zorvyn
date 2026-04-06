import { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";
import Header from "./components/ui/Header";
import NavTabs from "./components/ui/NavTabs";
import Dashboard from "./components/dashboard/Dashboard";
import Transactions from "./components/transactions/Transactions";
import Insights from "./components/insights/Insights";

function AppContent() {
  const { state } = useContext(AppContext);

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117" }}>
      <Header />
      <NavTabs />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1.5rem" }}>
        {state.activeTab === "dashboard"    && <Dashboard />}
        {state.activeTab === "transactions" && <Transactions />}
        {state.activeTab === "insights"     && <Insights />}
      </div>
      <footer style={{
        textAlign: "center", padding: "1.5rem",
        color: "#374151", fontSize: "11px",
        fontFamily: "'DM Mono', monospace",
      }}>
        FINTRACK · BUILT WITH REACT
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
