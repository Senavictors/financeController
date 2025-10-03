import React, { useEffect, useState } from "react";
import { listTransactions, createTransaction } from "../api/transactions";

export default function TransactionsDemo() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    listTransactions()
      .then(setItems)
      .catch((err) => console.error("Erro ao carregar transações:", err));
  }, []);

  const handleCreate = async () => {
    try {
      const res = await createTransaction({
        title: "Padaria",
        amount: -25.9,
        type: "EXPENSE",
      });
      // Simplesmente recarrega os itens; em app real, atualize estado com o retorno
      const updated = await listTransactions();
      setItems(updated);
      console.log(res);
    } catch (err) {
      console.error("Erro ao criar transação:", err);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Transações</h3>
      <button onClick={handleCreate}>Criar exemplo</button>
      <ul>
        {items.map((t) => (
          <li key={t.id}>
            {t.title} — {t.amount} — {t.type}
          </li>
        ))}
      </ul>
    </div>
  );
}