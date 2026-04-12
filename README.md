# FinTrack — Finance Dashboard

A clean, interactive personal finance dashboard built with React to visualize transactions, track spending, and compare financial trends in a polished UI.

[Live Demo ](https://finance-dashboard-zorvyn-gules.vercel.app/)
---

## Quick Start

```bash
cd fintrack
npm install
npm start
```
---

## Project Structure

```
fintrack/
├── index.html                  
├── package.json               
├── vite.config.js      
│
├── public/                    
│   └── (images, icons, etc.)  
│
└── src/
    ├── main.jsx                
    ├── App.jsx               
    ├── index.css             
    │
    ├── context/
    │   └── AppContext.jsx      # Global state management (Context + useReducer)
    │
    ├── hooks/
    │   ├── useApp.js           # Custom hook to access AppContext easily
    │   └── useFilteredTransactions.js # Memoized filtering + sorting logic
    │
    ├── data/
    │   ├── constants.js        # Static configs (categories, colors, labels)
    │   └── mockTransactions.js # Seed/demo transaction data
    │
    ├── utils/
    │   └── formatters.js       # Helper functions (currency, date, ID generation)
    │
    └── components/
        ├── ui/
        │   ├── Header.jsx              # Top navigation (logo + role switcher)
        │   ├── NavTabs.jsx             # Tab navigation (Overview, Transactions, Insights)
        │   ├── Modal.jsx               # Reusable modal wrapper
        │   └── SummaryCard.jsx         # KPI card (balance, income, expenses, etc.)
        │
        ├── charts/
        │   ├── LineChart.jsx           # Balance trend (SVG line/area chart)
        │   ├── BarChart.jsx            # Monthly comparison (grouped bars)
        │   └── DonutChart.jsx          # Category breakdown (donut chart)
        │
        ├── dashboard/
        │   └── Dashboard.jsx           # Overview page (cards + charts layout)
        │
        ├── transactions/
        │   ├── Transactions.jsx        # Main transactions page (state + layout)
        │   ├── TransactionFilters.jsx  # Search, filter dropdowns, add button
        │   ├── TransactionTable.jsx    # Sortable table with edit/delete actions
        │   └── TransactionForm.jsx     # Add/Edit transaction form (inside modal)
        │
        └── insights/
            ├── Insights.jsx            # Insights dashboard page
            ├── InsightCards.jsx        # Key metrics (top category, avg spend, savings rate)
            ├── MonthlyComparison.jsx   # Month-wise comparison with savings visualization
            └── CategoryBreakdown.jsx   # Category-wise spending (progress bars)
```

---

## Features

### Dashboard Overview
- **4 summary cards** — Total Balance, Income, Expenses, Transaction count
- **Balance Trend** — SVG line chart showing cumulative balance over months
- **Monthly Income vs Expense** — grouped bar chart per month
- **Spending Breakdown** — donut chart + legend by category

### Transactions
- Full transaction table with date, description, category, amount, type
- **Sort** by any column (click header, toggles asc/desc)
- **Filter** by type, category, and month
- **Search** by description or category name
- Footer shows filtered count and filtered income/expense totals

### Role-Based UI
Switch roles via the top-right dropdown — no login required (demo simulation).

| Feature          | Admin | Viewer |
|------------------|-------|--------|
| View all data    | ✅    | ✅     |
| Add transaction  | ✅    | ❌     |
| Edit transaction | ✅    | ❌     |
| Delete transaction | ✅  | ❌     |
| Info banner      | ❌    | ✅     |

### Insights
- Top spending category, average monthly income/expense, savings rate
- Month-by-month comparison table with visual savings rate bar
- Category breakdown with proportional progress bars

### State Management
All state lives in a single `useReducer` inside `AppContext`:
- `transactions` — the source of truth array
- `role` — "admin" | "viewer"
- `filter` — { type, category, month }
- `sort` — { field, dir }
- `search` — string
- `activeTab` — current page

Filtering/sorting logic is in `useFilteredTransactions` (a custom hook with `useMemo`) so the table never re-derives unless state actually changes.

---

## Tech Stack

| Tool | Usage |
|------|-------|
| React 18 | UI framework |
| useReducer + Context | Global state management |
| Custom hooks | Encapsulate reusable logic |
| Inline SVG | Charts (no chart library needed) |
| CSS-in-JS (inline styles) | Component-scoped styling |
| Google Fonts |

No external chart library, no Redux, no routing library — kept intentionally lean.

---

## Assumptions

- Data is mock/static — no backend or API calls
- Roles are toggled via UI dropdown for demo purposes only
- All amounts are in Indian Rupees (₹)
- Dates follow ISO format (YYYY-MM-DD) internally

Built with React 
