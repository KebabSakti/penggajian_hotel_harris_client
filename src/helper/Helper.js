import { message } from "antd";

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

export function mMessage(msg, type) {
  const msgKey = "message.key";

  switch (type) {
    case "loading":
      message.loading({
        key: msgKey,
        content: msg,
        duration: 0,
      });
      break;

    case "success":
      message.success({
        key: msgKey,
        content: msg,
        duration: 1,
      });
      break;

    case "error":
      message.error({
        key: msgKey,
        content: msg,
        duration: 2,
      });
      break;
  }
}
