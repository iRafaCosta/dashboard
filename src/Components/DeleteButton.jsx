import { useState } from "react"
import { useNavigate } from "react-router-dom"
 
export default function DeleteButton({name, id, library}){

    const navigate = useNavigate()

    const [budgets, setBudgets] = useState(() => {
            const storageBudgets = localStorage.getItem('obc-budgets')
            if(!storageBudgets)return []
            const budgets = JSON.parse(storageBudgets)
            return budgets
        })

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
        

    const deleteOption = (itemId) =>{
        if(library === 'obc-budgets'){
            setBudgets(currentState => {
                const updateOptions = currentState.filter(i => i.id !== itemId)
                localStorage.setItem(library, JSON.stringify(updateOptions))
                return updateOptions
            })
        }if(library === 'obc-pots'){
            setPots(currentState => {
                const updateOptions = currentState.filter(i => i.id !== itemId)
                localStorage.setItem(library, JSON.stringify(updateOptions))
                return updateOptions
            })
        }if(library === 'obc-transaction'){
            setTransactions(currentState => {
                const updateOptions = currentState.filter(i => i.id !== itemId)
                localStorage.setItem(library, JSON.stringify(updateOptions))
                return updateOptions
            })
        }
    }

    const handleDelete = () => {
        if(confirm(`Você deseja apagar ${name} da lista?`)){
            deleteOption(id)
            navigate('/')
        }
    }

    
    return(
        <>
            <button className="delete-btn" onClick={handleDelete}>Apagar</button>
        </>
    )
}