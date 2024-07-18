import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../layout/Loader";

const ExpenseForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: "",
        transaction_type: "EX",
        amount: "",
        execution_date: "",
        payment_method: "CC",
        status: true,
        // support_document: '',
        created_by: 1
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expense, setExpense] = useState(null);

    useEffect(() => {
        if (id) {
            fetchExpenseById(id);
        }
    }, [id]);

    useEffect(() => {
        if (expense && id) {
            setFormData({ ...expense });
        }
    }, [expense, id]);

    const fetchExpenseById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/expenses/${id}/`);
            setExpense(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, support_document: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseData = new FormData();
        for (const key in formData) {
            expenseData.append(key, formData[key]);
        }

        setLoading(true);
        setError(null);

        try {
            if (id) {
                await axios.put(`/expenses/${id}/`, expenseData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
            } else {
                await axios.post(`/expenses/list/`, expenseData);
            }
            setLoading(false);
            navigate("/");
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <h2>{id ? "Edit Expense" : "Add Expense"}</h2>
            <form onSubmit={handleSubmit} className="expense-form">
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Transaction Type</label>
                    <select
                        className="form-select"
                        name="transaction_type"
                        value={formData.transaction_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="IN">Income</option>
                        <option value="EX">Expense</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Execution Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="execution_date"
                        value={formData.execution_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select
                        className="form-select"
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={handleChange}
                        required
                    >
                        <option value="CC">Credit Card</option>
                        <option value="DC">Debit Card</option>
                        <option value="CH">Cash</option>
                        <option value="C">Credit</option>
                    </select>
                </div>
                {/*      <div className="mb-3">
                    <label className="form-label">Support Document</label>
                    <input
                        type="file"
                        className="form-control"
                        name="support_document"
                        onChange={handleFileChange}
                    />
                </div> */}
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                        {id ? "Update Expense" : "Add Expense"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;
