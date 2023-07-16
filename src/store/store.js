import {combineReducers, createStore} from 'redux'
import amountReducer from './reducers/amountReducer'
import transactionReducer from './reducers/transactionReducer';

const reducer = combineReducers({
    amount: amountReducer,
    transactionList: transactionReducer,
})
const store = createStore(reducer)

export default store
