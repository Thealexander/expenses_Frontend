import { Header, Footer } from "./components/layout";
import "./App.css";
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ExpenseDetails from "./components/expense/ExpenseDetails";
import ExpenseForm from "./components/expense/ExpenseForm";
import Login from './components/jwt/Login';
import Register from "./components/jwt/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./actions/userActions";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(loadUser({}));
    }

  }, [dispatch, token]);


  return (
    <Router>
      <div className="App">
        {<Header />}
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/expenses/:id/' element={<ExpenseDetails />} />
            <Route path="/add-expense" element={<ExpenseForm />} />
            <Route path="/edit-expense/:id" element={<ExpenseForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
