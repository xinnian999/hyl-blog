export const sendApi = (data, controller) => {
  return fetch("/api/all/chatgpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal: controller.signal,
    body: JSON.stringify(data),
  });
};
