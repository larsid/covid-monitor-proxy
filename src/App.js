import './App.css';
import ContextProvider from './contexts/Context';
import Dashboard from './components/dashboard/Dashboard';


export default function App() {
    return (
        <ContextProvider>
            <div className="container">
                <Dashboard />
            </div> 
        </ContextProvider>
    );
}