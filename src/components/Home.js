import React, { Fragment, useEffect } from "react";
import { MetaData } from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../actions/expensesActions";
//import Loader from './layout/Loader.js'
import Expense from "./expense/Expense.js";
import { useAlert } from "react-alert";
import Expenses from "./expenses/Expenses.js";

const Home = () => {
  const dispatch = useDispatch();

  const { expenses, loading, error } = useSelector((state) => state.expenses);
  const alert = useAlert();
  console.log('error===> ', error)

  useEffect(() => {
    if (error != null) {
      return alert.error(error);
    }

    dispatch(getExpenses());
  }, [dispatch, alert, error])

  // if (loading) { return (<Loader />); }

  return (
    < Fragment >
      <MetaData title={'Helping you to control expenses and ingress'} />
      <section id='expenses' className="container mt-5">
        <div className="row">
          <Expenses col={1} expenses={expenses} loading={loading} />
        </div>
      </section>
    </Fragment >
  )


};

export default Home;
