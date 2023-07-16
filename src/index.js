import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TransactionFormPage from './views/TransactionFormPage/TransactionFormPage';
import TransactionListPage from './views/TransactionListPage/TransactionListPage';
import ErrPage from './views/ErrPage/ErrPage';
import './App.css';
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<TransactionFormPage/>}></Route>
                        <Route path="transaction-list" element={<TransactionListPage/>}></Route>
                        <Route path="*" element={<ErrPage/>}></Route>
                    </Route>
                </Routes>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
);
reportWebVitals();
