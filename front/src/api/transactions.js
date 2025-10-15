import api from "./client";

export const listTransactions = async () => {
  const { data } = await api.get("/api/transactions");
  return data;
};

export const createTransaction = async (payload) => {
  const { data } = await api.post("/api/transactions", payload);
  return data;
};