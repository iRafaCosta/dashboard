import {Link, Outlet} from 'react-router-dom'

export default function RootLayout(){
    return(
        <section >
            <header>
                <h1 className='title'>Dashboard</h1>
                <div className='item-menu'>
                    <Link to='/'> Início</Link>
                    <Link to='/budgets'>Limite de crédito</Link>
                    <Link to='/pots'>Porquinhos</Link>
                    <Link to='/transactions'>Transações</Link>
                </div>
            </header>
            <Outlet />
            
        </section>
    )
}