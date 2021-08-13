export function debounce(func, delay) {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

export function formatCurrency(value) {
  const formatter = new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(value);
}
