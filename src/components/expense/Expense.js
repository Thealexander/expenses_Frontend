import React from "react";
import { Link } from "react-router-dom";
//import './Expense.css'; // Asegúrate de importar el archivo CSS

const Expense = ({ expense }) => {
  const incomeImage = './images/income.png';
  const expenseImage = './images/expenses.png';

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
          <Link to={`/expense/${expense.id}`}>{expense.description}</Link>
        </h5>
        <div className="mt-auto">
          <p className="card-text"><strong>Transaction Type:</strong> {isIncome ? "Income" : "Expense"}</p>
          <p className="card-text"><strong>Amount:</strong> $ {expense.amount}</p>
          <p className="card-text"><strong>Execution Date:</strong> {new Date(expense.execution_date).toLocaleDateString()}</p>
        </div>
        <Link id="view_btn" className="btn btn-block mt-auto" to={`/expense/${expense.id}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default Expense;
