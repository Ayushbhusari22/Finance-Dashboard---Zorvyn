# FinTrack — Finance Dashboard

A clean, interactive personal finance dashboard built with React, created as a frontend developer intern assignment to visualize transactions, track spending, and compare financial trends in a polished UI.

[Live Demo ](https://)
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
├── public/
│   └── index.html
└── src/
    ├── App.jsx                        # Root component
    ├── index.js                       # Entry point
    ├── index.css                      # Global styles + font import
    │
    ├── context/
    │   └── AppContext.jsx             # useReducer + Context (global state)
    │
    ├── hooks/
    │   ├── useApp.js                  # Convenience wrapper for AppContext
    │   └── useFilteredTransactions.js # Memoized filter + sort logic
    │
    ├── data/
    │   ├── constants.js               # Category names, colors, month labels
    │   └── mockTransactions.js        # 30 seed transactions (Jan–Mar 2024)
    │
    ├── utils/
    │   └── formatters.js              # fmt(), fmtDate(), genId()
    │
    └── components/
        ├── ui/
        │   ├── Header.jsx             # Top bar: logo + role switcher
        │   ├── NavTabs.jsx            # Overview / Transactions / Insights tabs
        │   ├── Modal.jsx              # Reusable modal wrapper
        │   └── SummaryCard.jsx        # Single KPI tile
        │
        ├── charts/
        │   ├── LineChart.jsx          # SVG area/line chart (balance trend)
        │   ├── BarChart.jsx           # SVG grouped bar chart (monthly)
        │   └── DonutChart.jsx         # SVG donut chart (spending breakdown)
        │
        ├── dashboard/
        │   └── Dashboard.jsx          # Overview page (cards + 3 charts)
        │
        ├── transactions/
        │   ├── Transactions.jsx       # Page — wires everything together
        │   ├── TransactionFilters.jsx # Search + filter dropdowns + Add button
        │   ├── TransactionTable.jsx   # Sortable table with Edit/Delete
        │   └── TransactionForm.jsx    # Add / Edit form inside modal
        │
        └── insights/
            ├── Insights.jsx           # Insights page
            ├── InsightCards.jsx       # 4 KPI cards (top cat, avg, savings rate)
            ├── MonthlyComparison.jsx  # Month-by-month table with savings bar
            └── CategoryBreakdown.jsx  # Horizontal progress bars per category
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
