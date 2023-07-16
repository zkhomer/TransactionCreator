import React, {useState} from 'react';
import './modal.scss'

const Modal = ({transaction, updateTransaction, onClose, setTransactionData}) => {
    const [updatedTransaction, setUpdatedTransaction] = useState({
        id: transaction.id,
        amount: transaction.amount,
        transactionName: transaction.transactionName,
        transactionType: transaction.transactionType,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUpdatedTransaction((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTransaction(updatedTransaction);
        e.isPropagationStopped()
        setTransactionData(JSON.parse(localStorage.getItem('transactionList')) || []);
        onClose();

    };

    return (
        <div className="modal">
            <div className="modal-wrapper">
                <span>Edit Transaction ID: {transaction.id}</span>
                <form onSubmit={handleSubmit}>
                    <label className="modal__input" htmlFor="transactionId">
                        ID:
                        <input
                            type="text"
                            disabled={true}
                            id="transactionId"
                            name="id"
                            value={updatedTransaction.id}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="modal__input" htmlFor="transactionAmount">
                        Amount:
                        <input
                            type="number"
                            id="transactionAmount"
                            name="amount"
                            value={updatedTransaction.amount}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="modal__input" htmlFor="transactionName">
                        Name:
                        <input
                            type="text"
                            id="transactionName"
                            name="transactionName"
                            value={updatedTransaction.transactionName}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="modal__input" htmlFor="transactionType">
                        Type:
                        <input
                            type="text"
                            id="transactionType"
                            name="transactionType"
                            value={updatedTransaction.transactionType}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="modal__btn-group">
                        <button className="modal__btn" type="submit">Update</button>
                        <button className="modal__btn" onClick={onClose} type="button">close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
