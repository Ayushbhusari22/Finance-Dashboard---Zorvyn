import { useApp } from "../../hooks/useApp";

const TABS = [
  { id: "dashboard",    label: "Overview"      },
  { id: "transactions", label: "Transactions"  },
  { id: "insights",     label: "Insights"      },
];

export default function NavTabs() {
  const { state, dispatch } = useApp();

  return (
    <div style={{
      background: "#1c1f26",
      borderBottom: "1px solid #2d3139",
      padding: "0 1.5rem",
      display: "flex",
      gap: 4,
    }}>
      {TABS.map((tab) => {
        const active = state.activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => dispatch({ type: "SET_ACTIVE_TAB", payload: tab.id })}
            style={{
              background: "none",
              border: "none",
              borderBottom: `2px solid ${active ? "#f59e0b" : "transparent"}`,
              padding: "12px 14px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              color: active ? "#f59e0b" : "#6b7280",
              transition: "all .15s",
              fontFamily: "inherit",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
