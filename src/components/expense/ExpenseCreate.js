import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, resetCreate } from "../../slices/expenseCreateSlice";
import { useHistory } from "react-router-dom";

const ExpenseCreate = () => {
    const [description, setDescription] = useState("");
    const [transactionType, setTransactionType] = useState("IN");
    const [amount, setAmount] = useState("");
    const [executionDate, setExecutionDate] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("CC");
    const [supportDocument, setSupportDocument] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, success, error } = useSelector((state) => state.expenseCreate);

    const handleSubmit = (e) => {
        e.preventDefault();

        const expenseData = {
            description,
            transaction_type: transactionType,
            amount,
            execution_date: executionDate,
            payment_method: paymentMethod,
            support_document: supportDocument,
        };

        dispatch(addExpense(expenseData));
    };

    if (success) {
        dispatch(resetCreate());
        history.push("/expenses");
    }

    return (
        <div className="container mt-5">
            <h2>Create New Expense</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Transaction Type</label>
                    <select
                        className="form-control"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                    >
                        <option value="IN">Income</option>
                        <option value="EX">Expense</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Execution Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={executionDate}
                        onChange={(e) => setExecutionDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Payment Method</label>
                    <select
                        className="form-control"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="CC">Credit Card</option>
                        <option value="DC">Debit Card</option>
                        <option value="CH">Cash</option>
                        <option value="C">Credit</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Support Document</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setSupportDocument(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Expense"}
                </button>
            </form>
        </div>
    );
};

export default ExpenseCreate;
