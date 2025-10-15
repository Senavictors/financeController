const API_URL = process.env.REACT_APP_API_URL;

export async function listTransactionsFetch() {
  const res = await fetch(`${API_URL}/api/transactions`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createTransactionFetch(payload) {
  const res = await fetch(`${API_URL}/api/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}