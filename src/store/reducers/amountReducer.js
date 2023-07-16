const ADD = 'amount/ADD';
const TAKE = 'amount/TAKE';
const CLEAR = 'amount/CLEAR';

const add = (value) => ({
    type: ADD,
    payload: value,
});

const take = (value) => ({
    type: TAKE,
    payload: value,
});

const clear = () => ({
    type: CLEAR,
});

const amountReducer = (amount = Number(localStorage.getItem('amount')) || 0, action) => {
    let updatedAmount;

    switch (action.type) {
        case ADD:
            updatedAmount = amount + Number(action.payload);
            localStorage.setItem('amount', updatedAmount.toString());
            return updatedAmount;

        case TAKE:
            if (Number(action.payload) > amount) {
                return amount;
            }
            updatedAmount = amount - Number(action.payload);
            localStorage.setItem('amount', updatedAmount.toString());
            return updatedAmount;

        case CLEAR:
            localStorage.removeItem('amount');
            return 0;

        default:
            return amount;
    }
};

export const actions = {add, take, clear};

export default amountReducer;
