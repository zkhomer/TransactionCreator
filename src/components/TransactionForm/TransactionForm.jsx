import React, {useCallback, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './transaction-form.scss';
import {useDispatch, useSelector} from 'react-redux';
import {actions as amountActions} from '../../store/reducers/amountReducer';
import {transactionsActions} from '../../store/reducers/transactionReducer';

const validationSchema = Yup.object().shape({
    transactionName: Yup.string().required('Required input'),
    amount: Yup.number().moreThan(0, 'Amount must be greater than 0').required('Required input'),
    transactionType: Yup.string().required('Required input'),
});

const TransactionForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const amount = useSelector((state) => state.amount);
    const dispatch = useDispatch();

    const handleSubmit = useCallback(
        (values, {resetForm}) => {
            if (values.transactionType === 'Take') {
                if (values.amount > amount) {
                    setErrorMessage('Requested amount exceeds available balance.');
                    return;
                } else {
                    dispatch(amountActions.take(values.amount));
                    dispatch(
                        transactionsActions.add({...values, id: Date.now(), status: 'PASS'})
                    );
                }
            }
            if (values.transactionType === 'Add') {
                dispatch(amountActions.add(values.amount));
                dispatch(
                    transactionsActions.add({...values, id: Date.now(), status: 'PASS'})
                );
            }
            resetForm();
            setErrorMessage('');
        },
        [amount, dispatch]
    );

    return (
        <>
            <h1>Balance: {amount}</h1>
            <Formik initialValues={{transactionName: '', amount: '', transactionType: 'Add'}}
                    validationSchema={validationSchema} onSubmit={handleSubmit}>
                {() => (
                    <Form className="form-container">
                        <div>
                            <label htmlFor="transactionName">Name Transaction:</label>
                            <Field
                                className="transaction-form__input"
                                type="text"
                                id="transactionName"
                                name="transactionName"
                            />
                            <ErrorMessage name="transactionName" component="div" className="error"/>
                        </div>

                        <div>
                            <label htmlFor="amount">Amount transaction:</label>
                            <Field
                                className="transaction-form__input"
                                type="number"
                                id="amount"
                                name="amount"
                            />
                            <ErrorMessage name="amount" component="div" className="error"/>
                        </div>

                        <div>
                            <label htmlFor="transactionType">Type transaction:</label>
                            <Field
                                className="transaction-form__select"
                                as="select"
                                id="transactionType"
                                name="transactionType"
                            >
                                <option value="select type" disabled={true}>
                                    select type
                                </option>
                                <option value="Add">Add</option>
                                <option value="Take">Take</option>
                            </Field>
                            <ErrorMessage
                                name="transactionType"
                                component="div"
                                className="error"
                            />
                        </div>

                        <button type="submit">Create</button>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </Form>
                )}
            </Formik>

        </>
    );
};

export default React.memo(TransactionForm);
