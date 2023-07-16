const ADD = "transaction/ADD";
const DELETE = "transaction/DELETE";
const CLEAR = "transaction/CLEAR";
const UPDATE = "transaction/UPDATE";

const add = (value) => ({
    type: ADD,
    payload: value
});

const deleteTransaction = (value) => ({
    type: DELETE,
    payload: value
});

const updateTransaction = (value) => ({
    type: UPDATE,
    payload: value

});

const clear = () => ({
    type: CLEAR
});

const transactionReducer = (transactions = JSON.parse(localStorage.getItem('transactionList')) || [], action) => {
    switch (action.type) {
        case ADD: {
            const updatedTransactions = [...transactions, action.payload];
            localStorage.setItem("transactionList", JSON.stringify(updatedTransactions));
            return updatedTransactions;
        }
        case DELETE: {
            const updatedTransactions = transactions.filter(el => el.id !== action.payload.id);
            localStorage.setItem("transactionList", JSON.stringify(updatedTransactions));
            return updatedTransactions;
        }
        case UPDATE: {
            const updatedTransactions = transactions.map((transaction) => {
                if (transaction.id === action.payload.id) {
                    return {
                        ...transaction,
                        id: action.payload.id,
                        amount: action.payload.amount,
                        transactionName: action.payload.transactionName,
                        transactionType: action.payload.transactionType,
                    };
                }
                return transaction;
            });

            localStorage.setItem("transactionList", JSON.stringify(updatedTransactions));
            return updatedTransactions;
        }
        case CLEAR:
            localStorage.removeItem("transactionList");
            return [];
        default:
            return transactions;
    }
};

export const transactionsActions = {add, deleteTransaction, clear, updateTransaction};

export default transactionReducer;
