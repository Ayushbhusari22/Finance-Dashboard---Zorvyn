
export const fmt = (n) =>
  "₹" + Math.abs(Number(n)).toLocaleString("en-IN");

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const monthKey = (dateStr) => dateStr.slice(0, 7);

export const genId = () => Date.now();
