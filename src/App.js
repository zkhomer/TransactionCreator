import './App.css';
import {Outlet} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'

function App() {
    return (
        <>
            <NavBar/>
            <div className="App">
                <Outlet/>
            </div>
        </>
    );
}

export default App;
