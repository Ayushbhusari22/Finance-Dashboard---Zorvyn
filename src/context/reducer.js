import { initialTransactions } from "../data/transactions";

export const initialState = {
    transactions: initialTransactions,
    role: "admin",
    filter: { type: "all", category: "all", month: "all" },
    sort: { field: "date", dir: "desc" },
    search: "",
    activeTab: "dashboard",
};

export function reducer (state, action) {
    switch (action.type) {
        case "ADD_TRANSACTION":
            return { ...state, transactions: [action.payload, ...state.transactions] };

        case "DELETE_TRANSACTION":
            return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };

        case "SET_ACTIVE_TAB":
            return { ...state, activeTab: action.payload };

        default:
            return state;
    }
}