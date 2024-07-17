import React from 'react'
import Loader from '../layout/Loader'
import Expense from '../expense/Expense'

const Expenses = ({ expenses, col, loading }) => {
    if (loading) {
        return <Loader />;
    }

    if (!expenses || expenses.length === 0) {
        return <p>No expenses found.</p>; // Message for empty expenses
    }

    return (
        <React.Fragment>
            {expenses.map(expenseElement => (
                <Expense key={expenseElement.id} expense={expenseElement} col={col} />
            ))}
        </React.Fragment>
    );
};

export default Expenses
