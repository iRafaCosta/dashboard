import { useState } from 'react'
import CreateBudget from '../entities/CreateBudget'
import DeleteButton from '../Components/DeleteButton'

export default function Budgets(){
    const defaultBudget = {
        name: '',
        value: 0
    }
    const [item,setItem] = useState(defaultBudget)


    const [budgets, setBudgets] = useState(() => {
        const storageBudgets = localStorage.getItem('obc-budgets')
        if(!storageBudgets)return []
        const budgets = JSON.parse(storageBudgets)
        return budgets
    })


    function addBudgets(budget){
        setBudgets((currentState) => {
            const updateBudgets = [budget, ...currentState]
            localStorage.setItem('obc-budgets', JSON.stringify(updateBudgets))
            return updateBudgets
        })
    }

    const handleChange = (ev) =>{
        setItem((currentState) => {
            return{
                ...currentState,
                [ev.target.name]: ev.target.value
            }
        })
    }


    const handleSubmit = (ev) =>{
        ev.preventDefault()

        try {
            const validBudget = new CreateBudget(item)
            addBudgets(validBudget)
            setItem(defaultBudget)
            alert('Budget Cadastrado!')
        } catch (error) {
            console.log(error.message)
        }

    }

    return(
        <div className="other-section">
            <h1>Cadastro do Limite de Crédito</h1>
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

            <table className='transaction-table'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Criação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                   {budgets.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                        <td>{item.createdAt}</td>
                        <td><DeleteButton name={item.name} id={item.id} library={'obc-budgets'} /></td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}