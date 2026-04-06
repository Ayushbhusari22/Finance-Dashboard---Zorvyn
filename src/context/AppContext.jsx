import { createContext, useReducer } from "react";
import mockTransactions from "../data/mockTransactions";

// ─── Context ─────────────────────────────────────────────────────────────────
export const AppContext = createContext();

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  transactions: mockTransactions,
  role: "admin",                               // "admin" | "viewer"
  filter: { type: "all", category: "all", month: "all" },
  sort:   { field: "date", dir: "desc" },
  search: "",
  activeTab: "dashboard",                      // "dashboard" | "transactions" | "insights"
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };

    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case "SET_FILTER":
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case "SET_SORT":
      return { ...state, sort: action.payload };

    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "SET_ROLE":
      return { ...state, role: action.payload };

    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };

    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
