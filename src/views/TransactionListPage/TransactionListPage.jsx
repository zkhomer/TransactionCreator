import React, {useEffect, useState} from 'react';
import './transaction-list-page.scss';
import {useDispatch, useSelector} from 'react-redux';
import {transactionsActions} from '../../store/reducers/transactionReducer';
import Modal from '../../components/Modal/Modal';
import sortService from '../../services/sortService';
import datePicker from '../../services/datePicker';

const TransactionListPage = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const amount = useSelector((state) => state.amount);
    const transactionList = useSelector((state) => state.transactionList);
    const dispatch = useDispatch();
    const [sortBy, setSortBy] = useState({field: '', order: 'asc'});
    const [totalEarned, setTotalEarned] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    const removeHandler = (transaction, e) => {
        e.stopPropagation();
        dispatch(transactionsActions.deleteTransaction(transaction));
        setTransactionData(JSON.parse(localStorage.getItem('transactionList')) || []);
    };

    const openModal = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
    };

    const updateTransaction = (updatedTransaction) => {
        dispatch(transactionsActions.updateTransaction(updatedTransaction));
    };

    const checkType = (el) => {
        const storedTransaction = transactionList.find((item) => item.id === el.id);
        if (storedTransaction.transactionType === 'Take') {
            return storedTransaction.amount < Number(JSON.parse(localStorage.getItem('amount')))
        }
        return true
    };

    const sortByField = (field, order) => {
        let sortedArray = [...transactionData];

        if (field === sortBy.field) {
            order = sortBy.order === 'asc' ? 'desc' : 'asc';
        }

        sortedArray = sortService.sortByField(sortedArray, field, order);
        setTransactionData(sortedArray);
        setSortBy({field, order});
    };

    useEffect(() => {
        const calculateTotals = () => {
            const earned = transactionData
                .filter((el) => el.transactionType === 'Add')
                .reduce((total, el) => total + el.amount, 0);

            const spend = transactionData
                .filter((el) => el.transactionType === 'Take' && el.status !== 'REJECT')
                .reduce((total, el) => total + el.amount, 0);

            setTotalEarned(earned);
            setTotalSpend(spend);
        };

        calculateTotals();
    }, [transactionData]);

    useEffect(() => {
        setTransactionData(JSON.parse(localStorage.getItem('transactionList')) || []);
    }, []);

    useEffect(() => {
        localStorage.setItem('transactionList', JSON.stringify(transactionList));
    }, [transactionList]);

    return (
        <>
            <h1>Transaction list Page</h1>
            <h2>Balance: {amount}</h2>
            <h2>Total earned: {totalEarned > 0 ? totalEarned : 0}</h2>
            <h2>Total spend: {totalSpend > 0 ? totalSpend : 0}</h2>
            <table>
                <thead>
                <tr>
                    <th onClick={() => sortByField('id')}>ID</th>
                    <th onClick={() => sortByField('id')}>Date</th>
                    <th onClick={() => sortByField('amount')}>Cost</th>
                    <th onClick={() => sortByField('transactionName')}>Name</th>
                    <th onClick={() => sortByField('transactionType')}>Type</th>
                    <th onClick={() => sortByField('status')}>Status</th>
                </tr>
                </thead>
                <tbody>
                {transactionData.map((el) => (
                    <tr
                        onClick={() => openModal(el)}
                        style={checkType(el) ? {backgroundColor: 'lightgreen'} : {backgroundColor: 'red'}}
                        key={el.id}
                    >
                        <td>{el.id}</td>
                        <td>{datePicker.formatDate(el.id)}</td>
                        <td>{el.amount}</td>
                        <td>{el.transactionName}</td>
                        <td>{el.transactionType}</td>
                        <td>{checkType(el) ? 'PASS' : 'REJECT'}</td>
                        <td>
                            <button onClick={(e) => openModal(el)}>Edit Transaction</button>
                            <button onClick={(e) => removeHandler(el, e)}>Remove Transaction</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedTransaction && (
                <Modal
                    transaction={selectedTransaction}
                    updateTransaction={updateTransaction}
                    onClose={closeModal}
                    setTransactionData={setTransactionData}
                />
            )}
        </>
    );
};

export default TransactionListPage;
