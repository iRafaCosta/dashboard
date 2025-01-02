import {createBrowserRouter} from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import RootLayout from './Components/RootLayout'
import Budgets from './Pages/Budgets'
import Pots from './Pages/Pots'
import Transactions from './Pages/Transactions'


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {index: true,
             element: <Dashboard />   
        },{
            path: '/budgets',
            element: <Budgets />
        },{
            path: '/pots',
            element: <Pots />
        },{
            path: '/transactions',
            element: <Transactions />
        }
        ]
    }
])

export default router