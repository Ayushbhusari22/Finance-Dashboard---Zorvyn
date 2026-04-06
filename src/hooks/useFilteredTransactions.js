import { useMemo } from "react";
import { useApp } from "./useApp";

/**
 * Returns the transaction list after applying current
 * search, filter, and sort state.
 */
export function useFilteredTransactions() {
  const { state } = useApp();
  const { transactions, filter, sort, search } = state;

  return useMemo(() => {
    let tx = [...transactions];

    // Search
    if (search) {
      const q = search.toLowerCase();
      tx = tx.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    // Filters
    if (filter.type !== "all")     tx = tx.filter((t) => t.type === filter.type);
    if (filter.category !== "all") tx = tx.filter((t) => t.category === filter.category);
    if (filter.month !== "all")    tx = tx.filter((t) => t.date.slice(5, 7) === filter.month);

    // Sort
    tx.sort((a, b) => {
      let av = a[sort.field];
      let bv = b[sort.field];
      if (sort.field === "amount") { av = +av; bv = +bv; }
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ?  1 : -1;
      return 0;
    });

    return tx;
  }, [transactions, filter, sort, search]);
}
