import React from "react";
import { Link } from "react-router-dom";

const Expense = ({ expense }) => {
  const default_image = './images/expensive_logo.png';

  return (
    <div className="card p-3 rounded mb-3">
      <div className="d-flex flex-column">
        <img
          className="card-img-top mx-auto mb-3"
          src={expense.support_document ? expense.support_document.url : default_image}
          alt={expense.description}
        />
        <h5 className="card-title">
          <Link to={`/expense/${expense.id}`}>{expense.description}</Link>
        </h5>
        <div className="mt-auto">
          <p className="card-text"><strong>Transaction Type:</strong> {expense.transaction_type === "IN" ? "Income" : "Expense"}</p>
          <p className="card-text"><strong>Amount:</strong> $ {expense.amount}</p>
          <p className="card-text"><strong>Execution Date:</strong> {new Date(expense.execution_date).toLocaleDateString()}</p>
        </div>
        <Link id="view_btn" className="btn btn-block mt-auto" to={`/expense/${expense.id}`}>
          More Details
        </Link>
      </div>
    </div>
  );
};

export default Expense;