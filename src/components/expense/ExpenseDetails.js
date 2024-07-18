import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseById, updateExpense } from "../../actions/expensesActions";
import { useParams, useNavigate } from "react-router-dom";
import Loader from '../layout/Loader';


const ExpenseDetails = () => {
    const incomeImage = './images/income.png';
    const expenseImage = './images/expenses.png';
    const imageSrc = isIncome ? incomeImage : expenseImage;

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { expense, loading, error } = useSelector((state) => state.expense);

    useEffect(() => {
        dispatch(getExpenseById(id));
    }, [dispatch, id]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to void this expense?")) {
            dispatch(updateExpense({ id, expenseData: { ...expense, status: false } }));
            navigate("/"); // Redirect to Home
        }
    };

    const handleAddNew = () => {
        navigate("/add-expense"); // Assuming you have a route for adding new expenses
    };

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;
    if (!expense) return <div>Expense not found</div>;

    const isIncome = expense.transaction_type === "IN";
    const cardClass = isIncome ? "card-income" : "card-expense";

    return (
        <div className="container mt-5">
            <div className={`card p-3 rounded mb-3 ${cardClass}`}>
                <div className="d-flex flex-column">
                    <img
                        className="card-img-top mx-auto mb-3"
                        src={imageSrc}
                        alt={expense.description}
                    />
                    <h5 className="card-title">
                        <p><strong>Description:</strong> {expense.description}</p>
                    </h5>
                    <div className="mt-auto">
                        <p className="card-text"><strong>Transaction Type:</strong> {isIncome ? "Income" : "Expense"}</p>
                        <p className="card-text"><strong>Amount:</strong> $ {expense.amount}</p>
                        <p className="card-text"><strong>Execution Date:</strong> {new Date(expense.execution_date).toLocaleDateString()}</p>
                        <p className="card-text"><strong>Payment Method:</strong> {expense.payment_method}</p>
                        <p className="card-text"><strong>Status:</strong> {expense.status ? "Saved" : "Void"}</p>
                        {expense.support_document && (
                            <div>
                                <strong>Support Document:</strong>
                                <a href={expense.support_document.url} target="_blank" rel="noopener noreferrer">
                                    View Document
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-primary" onClick={handleAddNew}>Add New Expense</button>
                <button className="btn btn-danger" onClick={handleDelete}>Void Expense</button>
            </div>
        </div>
    );
};

export default ExpenseDetails;
