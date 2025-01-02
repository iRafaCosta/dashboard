import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

export default function Dashboard() {
  const [budgets, setBudgets] = useState(() => {
    const storageBudgets = localStorage.getItem("obc-budgets");
    if (!storageBudgets) return [];
    const budgets = JSON.parse(storageBudgets);
    return budgets;
  });

  const [pots,setPots] = useState(() => {
    const storagePots = localStorage.getItem('obc-pots')
    if(!storagePots) return []
    const pots = JSON.parse(storagePots)
    return pots
})

const [transactions, setTransactions] = useState(() => {
  const storageTransaction = localStorage.getItem("obc-transaction");
  if (!storageTransaction) return [];
  const transactions = JSON.parse(storageTransaction);
  return transactions;
});


  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [total,setTotal] = useState(0)

  useEffect(() => {
    const amountExpense = transactions.filter((item) => item.type !== "Entrada").map((transaction) => +transaction.value);

      const amountIncome = transactions.filter((item) => item.type === 'Entrada').map((transaction) => +transaction.value);

      const expense = amountExpense.reduce((sum, num) => sum + num, 0).toFixed(2);
      const income = amountIncome.reduce((sum, num) => sum + num, 0).toFixed(2);

      const total = Math.abs(income - expense).toFixed(2);

      setIncome(`R$ ${income}`);
      setExpense(`R$ ${expense}`);
      setTotal(`${+income < +expense ? "-" : ""}R$ ${total} `);
  }, [transactions])

  const potsValue = pots.reduce((sum, i) => sum + i.value, 0)



  return (
    <section className="overview">
      <h1>Overview</h1>
      <div className="values">
        <div className="balance">
          <h4>Saldo em Conta</h4>
          <span className="balance-value">{total}</span>
        </div>

        <div className="item">
          <h4>Entrada</h4>
          <span className="income">{income}</span>
        </div>

        <div className="item">
          <h4>Saida</h4>
          <span className="expenses">{expense}</span>
        </div>
      </div>
      <div className="overview-bottom">
        <div className="pots">
          <div className="headline">
            <h4>Porquinho</h4>
            <Link to="/pots">
              Veja os detalhes{" "}
            </Link>
          </div>
          <div className="all-pots">
            <div className="total-pots">
              <div className="infos">
                <h4>Valor Guardado</h4>
                <span className="total-value">$ {potsValue}</span>
              </div>
            </div>
            <div className="rest-pots">
              {pots.map((item) => (
                <div key={item.id} className="items">
                  <h5>{item.name}</h5>
                  <span className="amount">$ {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="budgets">
          <div className="headline">
            <h4>Limite de Crédito</h4>
            <Link to="/budgets">
              Veja os detalhes
            </Link>
          </div>
          <div className="graphs">
            <div style={{ width: "300px" }}>
              <Doughnut
                data= {{
                    datasets: [{
                      label: 'Linha de Crédito',
                      data: budgets.map(item => item.value)
                    }]
                  }}
              />
            </div>
            <div className="graph-content">
              {budgets.map((item) => (
                <div key={item.id} className="items">
                  <h5>{item.name}</h5>
                  <span className="bills">
                    $<span>{item.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="transaction">
          <div className="headline">
            <h4>Transações</h4>
            <Link to="/transactions">
              Veja Tudo 
            </Link>
          </div>
          <div className="transactions">
            {transactions.map((item) => (
              <div key={item.id} className="new-transaction">
                <h4>{item.name}</h4>
                <div className="value-data">
                    <span className={`transaction-value ${item.type === "Entrada" ? "credit" : "debit"}`}>R$ {item.value}</span>
                    <span className="data-transaction">{item.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
