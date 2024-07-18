import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseById } from "../../actions/expensesActions";
import { useParams } from "react-router-dom";
import Loader from '../layout/Loader';

const ExpenseDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const incomeImage = './images/income.png';
    const expenseImage = './images/expenses.png';



    const { expense, loading, error } = useSelector((state) => state.expense);

    useEffect(() => {
        //console.log(`Fetching expense with ID: ${id}`); // Log para verificar el ID
        dispatch(getExpenseById(id));
    }, [dispatch, id]);

    useEffect(() => {
        //  console.log('Expense data:', expense); // Log para verificar los datos del expense
    }, [expense]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;
    const isIncome = expense.transaction_type === "IN";
    const cardClass = isIncome ? "card-income" : "card-expense";
    const imageSrc = isIncome ? incomeImage : expenseImage;

    return (
        <div className={`card p-3 rounded mb-3 ${cardClass}`}>
            <div className="d-flex flex-column">
                <img
                    className="card-img-top mx-auto mb-3"
                    src={imageSrc}
                    alt={expense.description}
                />
                <h5 className="card-title">
                    <p><strong>Description</strong> {expense.description}</p>
                </h5>
                <div className="mt-auto">
                    <p className="card-text"><strong>Transaction Type:</strong> {isIncome ? "Income" : "Expense"}</p>
                    <p className="card-text"><strong>Amount:</strong> $ {expense.amount}</p>
                    <p className="card-text"><strong>Execution Date:</strong> {new Date(expense.execution_date).toLocaleDateString()}</p>
                    <p className="card-text"><strong>Payment Method:</strong> {expense.payment_method}</p>
                </div>
            </div>
        </div>
    );
};

export default ExpenseDetails;
