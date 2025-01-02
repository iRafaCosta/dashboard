import { useState } from "react";
import DeleteButton from "../Components/DeleteButton";
import CreateBudget from "../entities/CreateBudget"


export default function Transactions() {
  const defaultPots = {
    name: "",
    value: 0,
  };

  const [item, setItem] = useState(defaultPots);

  const [pots, setPots] = useState(() => {
    const storagePots = localStorage.getItem("obc-pots");
    if (!storagePots) return [];
    const pots = JSON.parse(storagePots);
    return pots;
  });

  const addPots = (pot) => {
    setPots((currentState) => {
      const updatePots = [pot, ...currentState];
      localStorage.setItem(
        "obc-pots",
        JSON.stringify(updatePots)
      );
      return updatePots;
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
      const validPots = new CreateBudget(item);
      addTransactions(validPots);
      setItem(defaultPots);
      alert("Porquinho cadastrado!");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="other-section">
        <h1>Cadastro de Porquinho</h1>
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
            {pots.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>R$ {item.value}</td>
                <td>{item.createdAt}</td>
                <td>
                  <DeleteButton
                    name={item.name}
                    id={item.id}
                    library={"obc-pots"}
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
