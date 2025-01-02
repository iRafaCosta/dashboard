import { useState } from "react";
import DeleteButton from "../Components/DeleteButton";
import CreateTransaction, { TYPE } from "../entities/CreateTransaction";

export default function Transactions() {
  const defaultTransaction = {
    name: "",
    value: 0,
  };

  const [item, setItem] = useState(defaultTransaction);

  const [transactions, setTransactions] = useState(() => {
    const storageTransaction = localStorage.getItem("obc-transaction");
    if (!storageTransaction) return [];
    const transactions = JSON.parse(storageTransaction);
    return transactions;
  });

  const addTransactions = (transaction) => {
    setTransactions((currentState) => {
      const updateTransactions = [transaction, ...currentState];
      localStorage.setItem(
        "obc-transaction",
        JSON.stringify(updateTransactions)
      );
      return updateTransactions;
    });
  };

  const handleChange = (ev) => {
    setItem((currentState) => {
      return {
        ...currentState,
        [ev.target.name]: ev.target.value,
      };
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    try {
      const validTransaction = new CreateTransaction(item);
      addTransactions(validTransaction);
      setItem(defaultTransaction);
      alert("Transação cadastrada!");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="other-section">
        <h1>Cadastro de Transações</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={item.name}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="value">Valor:</label>
            <input
              type="number"
              name="value"
              onChange={handleChange}
              value={item.value}
              required
            />
          </div>
           <div className="input-box">
                    <label htmlFor="type">Categoria:</label>
                    <select 
                    name="type" 
                    id="type"
                    required
                    value={item.type}
                    onChange={handleChange}
                    >
                        <option value="" defaultChecked>Seleciona uma categoria...</option>
                        {TYPE.map((type) => (
                            <option
                            key={type}
                            value={type}
                            defaultChecked = {item.type === type}
                            >{type}</option>
                        ))}
                    </select>
          </div>
          <button type="submit">Adicionar</button>
        </form>

        <table className="transaction-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td
                  className={`${item.type === "Entrada" ? "credit" : "debit"} `}
                >
                  R$ {item.value}
                </td>
                <td>{item.createdAt}</td>
                <td>
                  <DeleteButton
                    name={item.name}
                    id={item.id}
                    library={"obc-transaction"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
